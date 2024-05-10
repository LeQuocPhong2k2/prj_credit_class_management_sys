import Student from "../models/Student.js";
import Majoir from "../models/Major.js";
import Account from "../models/Account.js";
import Class from "../models/Class.js";
import Course from "../models/Course.js";
import { ObjectId } from "mongodb";

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
          mssv: 1,
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
}
export default new StudentController();
