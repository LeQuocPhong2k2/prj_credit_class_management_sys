import Student from "../models/Student.js";
import Majoir from "../models/Major.js";
import Account from "../models/Account.js";
import Class from "../models/Class.js";
import Course from "../models/Course.js";
import { ObjectId } from "mongodb";
import moment from "moment-timezone";

class StudentController {
  async findStudentByAccountID(req, res) {
    const account_id = req.body.account_id;
    const objAccount_id = new ObjectId(account_id);
    const studentInfo = await Student.aggregate([
      {
        $match: {
          account_id: objAccount_id,
        },
      },
      {
        $lookup: {
          from: "majors",
          localField: "major",
          foreignField: "_id",
          as: "major",
        },
      },
      {
        $unwind: "$major",
      },
      {
        $lookup: {
          from: "accounts",
          localField: "account_id",
          foreignField: "_id",
          as: "account",
        },
      },
      {
        $unwind: "$account",
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          email: 1,
          dateOfBirth: 1,
          gender: 1,
          account_id: 1,
          definiteClass: 1,
          major: "$major",
          class: 1,
          mssv: "$account.userCode",
        },
      },
    ]);

    if (studentInfo.length > 0) {
      res.status(200).json({
        message: "Login successfully!!!",
        student: studentInfo,
      });
    } else {
      console.log("Không tìm thấy student từ account");
      res.status(404).json({ message: "student not found!!!" });
    }
  }

  async getCreditsByAccountID(req, res) {
    const account_id = req.body.account_id;
    let classDataBySemester = [];
    let sumCredit = 0;

    try {
      const studentData = await Student.findOne({ account_id: account_id });
      if (studentData) {
        let promises = studentData.class.map(async (e) => {
          if (e.status === "Hoàn thành") {
            const classData = await Class.findOne({ _id: e.classCode });
            if (classData) {
              const course = await Course.findOne({ _id: classData.course });
              return { courseCode: course.courseCode, courseName: course.courseName, courseCredit: course.credits };
            }
          }
        });
        classDataBySemester = await Promise.all(promises);
        classDataBySemester.forEach((e) => {
          if (e) {
            sumCredit += e.courseCredit;
          }
        });
      }

      res.status(200).json({ message: "Get credit total successfully!!!", creditTotal: sumCredit });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error occurred while fetching data!" });
    }
  }

  async registerClassCredit(req, res) {
    const classCreditCode = req.body.classCreditCode;
    const group = req.body.group;
    const account_id = req.body.account_id;
    const courseCode = req.body.courseCode;
    try {
      //check student exist
      const studentExist = await Student.findOne({ account_id: new ObjectId(account_id) });
      if (!studentExist) {
        res.status(200).json({ message: "ERR_404_STUDENT" });
        return;
      }
      //check class credit exist
      const classCreditCodeExist = await Class.find({ classCode: classCreditCode });
      if (classCreditCodeExist.length === 0) {
        res.status(200).json({ message: "ERR_404_CLASS" });
        return;
      }
      //check student exist in class list
      const studentExistInClass = await Class.aggregate([
        {
          $match: {
            classCode: classCreditCode,
            currentStudents: new ObjectId(studentExist._id),
          },
        },
      ]);
      if (studentExistInClass.length > 0) {
        res.status(200).json({ message: "ERR_500_EXISTCLASS" });
        return;
      }
      //check môn tiên quyết có học chưa
      let numPrerequisite = 0;
      let numPrerequisiteComplete = 0;
      const coursePrerequisite = await Course.findOne({ courseCode: courseCode });
      const promiseArray = coursePrerequisite.prerequisites.map(async (e) => {
        numPrerequisite++;
        const coursePrerequisiteExist = await Student.aggregate([
          {
            $match: {
              account_id: new ObjectId(account_id),
            },
          },
          {
            $unwind: "$class",
          },
          {
            $match: {
              "class.status": "Hoàn thành",
            },
          },
          {
            $lookup: {
              from: "class",
              localField: "class.classCode",
              foreignField: "_id",
              as: "classCredit",
            },
          },
          {
            $unwind: "$classCredit",
          },
          {
            $match: {
              "classCredit.course": e,
            },
          },
        ]);
        if (coursePrerequisiteExist.length > 0) {
          numPrerequisiteComplete++;
        }
        return numPrerequisiteComplete;
      });

      const resultData = await Promise.all(promiseArray);

      if (numPrerequisite !== numPrerequisiteComplete) {
        res.status(200).json({ message: "ERR_500_PREREQUISITE", data: coursePrerequisite });
        return;
      }

      //register class credit
      const studentData = await Student.findOne({ account_id: account_id });
      if (studentData) {
        const classData = await Class.findOne({ classCode: classCreditCode });
        if (classData) {
          const student = await Student.findOneAndUpdate(
            { account_id: account_id },
            {
              $push: {
                class: {
                  classCode: classData._id,
                  dateRegister: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD"),
                  mark: 0,
                  grank: 0,
                  status: "Đăng ký mới",
                  group: group,
                },
              },
            }
          );
          if (classData.currentStudents.length >= classData.maxStudents) {
            const updateClass = await Class.findOneAndUpdate(
              { classCode: classCreditCode },
              {
                $push: {
                  waitlist: student._id,
                },
              }
            );
            res.status(200).json({ message: "Class full save wating list" });
          } else {
            const updateClass = await Class.findOneAndUpdate(
              { classCode: classCreditCode },
              {
                $push: {
                  currentStudents: student._id,
                },
              }
            );
            res.status(200).json({ message: "Register class credit successfully!!!" });
          }
        } else {
          res.status(404).json({ message: "Class not found!!!" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Error occurred while fetching data!" });
    }
  }

  async getClassSchedule(req, res) {
    const account_id = req.body.account_id;
    try {
      const studentData = await Student.aggregate([
        {
          $match: {
            account_id: new ObjectId(account_id),
          },
        },
        {
          $unwind: "$class",
        },
        {
          $lookup: {
            from: "class",
            localField: "class.classCode",
            foreignField: "_id",
            as: "classDetail",
          },
        },
        {
          $unwind: "$classDetail",
        },
        {
          $project: {
            _id: 0,
            classCode: "$classDetail.classCode",
            className: "$classDetail.className",
            startTime: "$classDetail.time.startTime",
            endTime: "$classDetail.time.endTime",
            classDetails: "$classDetail.classDetails",
          },
        },
        {
          $unwind: "$classDetails",
        },
        {
          $lookup: {
            from: "teachers",
            localField: "classDetails.teacher",
            foreignField: "_id",
            as: "instructor",
          },
        },
        {
          $project: {
            classCode: 1,
            className: 1,
            startTime: 1,
            endTime: 1,
            classDetails: 1,
            teacher: { $arrayElemAt: ["$instructor", 0] },
          },
        },
      ]);

      if (studentData.length === 0) {
        res.status(404).json({ message: "Student not found!!!" });
      } else {
        res.status(200).json({ message: "Get class schedule successfully!!!", classSchedule: studentData });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error occurred while fetching data!" });
    }
  }

  async getLearningResult(req, res) {
    const account_id = req.body.account_id;
    try {
      const studentData = await Student.aggregate([
        {
          $match: {
            account_id: new ObjectId(account_id),
          },
        },
        {
          $unwind: "$class",
        },
        {
          $match: {
            "class.status": "Hoàn thành",
          },
        },
        {
          $lookup: {
            from: "class",
            localField: "class.classCode",
            foreignField: "_id",
            as: "classDetail",
          },
        },
        {
          $unwind: "$classDetail",
        },
        {
          $group: {
            _id: "$classDetail.semester",
            classCredit: { $push: "$$ROOT" },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

      if (studentData.length === 0) {
        res.status(404).json({ message: "Student not found!!!" });
      } else {
        res.status(200).json({ message: "Get learning result successfully!!!", learningResult: studentData });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error occurred while fetching data!" });
    }
  }
}
export default new StudentController();
