import Class from "../models/Class.js";
import Course from "../models/Course.js";
import moment from "moment-timezone";
import Student from "../models/Student.js";
import { ObjectId } from "mongodb";
import generateCourseCode from "../../util/UtilFunction.js";
class ClassController {
  //get class by classID
  async findClassByClassID(req, res) {
    const classID = req.body.classID;

    const lophoc = await Class.findOne({ _id: classID })
      .then((data) => {
        const course = Course.findOne({ _id: data.course })
          .then((dataCourse) => {
            res.status(200).json({
              message: "Get class successfully!!!",
              class: data,
              course: dataCourse,
            });
          })
          .catch((err) => {
            res.status(200).json({ message: "class not found!!  " });
          });
      })
      .catch((err) => {
        res.status(200).json({ message: "class not found!!  " });
      });
  }

  //get class by học kỳ và sinh viên
  async getClasCreditBySemesterAndCurrentSV(req, res) {
    const semester = req.body.semester;
    const account_id = req.body.account_id;
    let classDataBySemester = [];

    try {
      const classData = await Student.aggregate([
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
            as: "classes",
          },
        },
        {
          $unwind: "$classes",
        },
        {
          $match: {
            "classes.semester": semester,
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "classes.course",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: "$course",
        },
        {
          $project: {
            courseCode: "$course.courseCode",
            courseName: "$course.courseName",
            credits: "$course.credits",
            credits: "$course.credits",
          },
        },
      ]);

      res.status(200).json({ message: "Get class successfully!!!", class: classData });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error occurred while fetching data!" });
    }
  }

  //get class học lại
  async getClasCreditReLean(req, res) {
    const semester = req.body.semester;
    const account_id = req.body.account_id;
    const student = await Student.aggregate([
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
          "class.status": "Học lại",
        },
      },
      {
        $lookup: {
          from: "class",
          localField: "class.classCode",
          foreignField: "_id",
          as: "classes",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "classes.course",
          foreignField: "_id",
          as: "course",
        },
      },
    ]);
    if (student.length === 0) {
      return res.status(200).json({ message: "ERR_404" });
    }
    res.status(200).json({ message: "Get class successfully!!!", class: student });
  }

  //get class done registered
  async getClasCreditCompleteRegistration(req, res) {
    const semester = req.body.semester;
    const account_id = req.body.account_id;
    const student = await Student.aggregate([
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
          "class.status": "Đăng ký mới",
        },
      },
      {
        $lookup: {
          from: "class",
          localField: "class.classCode",
          foreignField: "_id",
          as: "classCreditComplete",
        },
      },
      {
        $unwind: "$classCreditComplete",
      },
      {
        $match: {
          "classCreditComplete.semester": semester,
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "classCreditComplete.course",
          foreignField: "_id",
          as: "courseOfClass",
        },
      },
      {
        $unwind: "$courseOfClass",
      },
      {
        $project: {
          classCode: "$classCreditComplete.classCode",
          className: "$classCreditComplete.className",
          expectedClass: "$classCreditComplete.expectedClass",
          credits: "$courseOfClass.credits",
          group: "$class.group",
          courseFee: "$courseOfClass.courseFee",
          dateRegister: "$class.dateRegister",
        },
      },
    ]);
    if (student.length === 0) {
      return res.status(200).json({ message: "ERR_404" });
    }
    res.status(200).json({ message: "Get class successfully!!!", class: student });
  }

  //get class by code
  async getClasCreditCourseCode(req, res) {
    const course_code = req.body.course_code;
    const semesters = req.body.semesters;

    try {
      const classByCourse = await Class.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: "$course",
        },
        {
          $match: {
            "course.courseCode": course_code,
            semester: semesters,
          },
        },
      ]);

      if (classByCourse.length > 0) {
        res.status(200).json({ message: "Get class successfully!!!", classCredit: classByCourse });
      } else {
        res.status(200).json({ message: "ERR_404", classCredit: classByCourse });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error occurred while fetching data!" });
    }
  }

  //get classdetails by classCode
  async getClassCreditDetailsByClassCode(req, res) {
    const class_code = req.body.class_code;
    try {
      const classData = await Class.aggregate([
        {
          $match: {
            classCode: class_code,
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
            as: "classDetails.teachers",
          },
        },
        {
          $unwind: "$classDetails.teachers",
        },
      ]);
      if (classData) {
        res.status(200).json({ message: "Get class successfully!!!", class: classData });
      } else {
        res.status(200).json({ message: "ERR_404" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error occurred while fetching data!" });
    }
  }

  //get class credit vừa đăng ký trong kỳ này
  async getClasCreditBySemester(req, res) {
    const account_id = req.body.account_id;
    const semester = req.body.semester;
    let classDataBySemester = [];
    let sumCredit = 0;
  }

  // create a new class
  async createClass(req, res) {
    const majorCredit = req.body.majorCredit;
    const courseNameCredit = req.body.courseNameCredit;
    const expectedClass = req.body.expectedClass;
    const maxStudent = req.body.maxStudent;
    const registrationOpenTime = req.body.registrationOpenTime;
    const registrationCloseTime = req.body.registrationCloseTime;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const classDetails = req.body.classDetails;
    const semester = req.body.semester;
    let classCode = generateCourseCode();

    let classExist = await Class.findOne({ classCode: classCode });
    while (classExist) {
      classCode = generateCourseCode();
      classExist = await Class.findOne({ classCode: classCode });
    }
    let course = await Course.findOne({ _id: new ObjectId(courseNameCredit) });

    const newClass = new Class({
      className: course.courseName,
      classCode: classCode,
      course: course._id,
      maxStudents: maxStudent,
      currentStudents: [],
      waitlist: [],
      time: {
        registrationOpenTime: registrationOpenTime,
        registrationCloseTime: registrationCloseTime,
        startTime: startTime,
        endTime: endTime,
      },
      status: "Chờ sinh viên đăng ký",
      classDetails: classDetails,
      semester: semester,
      expectedClass: expectedClass,
    });

    const saveClass = await newClass.save();
  }
  // api lấy id của sinh viên và id của lớp học, sau đó thêm sinh viên vào lớp học trong mảng currentStudents
  async addStudentToClass(req, res) {
    const { studentID, classID } = req.body;
    const lophoc = await Class.findOne({ _id: classID });
    console.log("lophoc: ", lophoc);
    if (lophoc) {
      console.log("Lấy class thành công");

      // kiểm tra xem mảng currentStudents đã có studentID đó chưa nếu có thì không thêm nữa
      if (lophoc.currentStudents.includes(studentID)) {
        console.log("Student đã có trong lớp học");
        return res.status(200).json({
          message: "Sinh viên đã có trong lớp học !!!",
        });
      }
      // nếu mảng currentStudents đã đủ số lượng sinh viên thì không thêm nữa
      if (lophoc.currentStudents.length >= lophoc.maxStudents) {
        console.log("Lớp học đã đủ số lượng sinh viên");
        return res.status(200).json({
          message: "Lớp học đã đủ số lượng sinh viên !!!",
        });
      }

      // thêm studentID vào mảng currentStudents
      lophoc.currentStudents.push(studentID);
      lophoc.save();
      res.status(200).json({
        message: "Thêm sinh viên vào lớp học thành công  !!!",
        class: lophoc,
      });
    } else {
      console.log("Không tìm thấy class");
      res.status(200).json({ message: "class not found!!!" });
    }
  }
  // hàm sinh viên rời khỏi lớp học
  async removeStudentFromClass(req, res) {
    const { studentID, classID } = req.body;
    const lophoc = await Class.findOne({ _id: classID });
    console.log("lophoc: ", lophoc);
    if (lophoc) {
      console.log("Lấy class thành công");

      // kiểm tra xem mảng currentStudents đã có studentID đó chưa nếu có thì không thêm nữa
      if (!lophoc.currentStudents.includes(studentID)) {
        console.log("Student không có trong lớp học");
        return res.status(200).json({
          message: "Sinh viên không có trong lớp học !!!",
        });
      }

      // thêm studentID vào mảng currentStudents
      lophoc.currentStudents.pull(studentID);
      lophoc.save();
      res.status(200).json({
        message: "Xóa sinh viên khỏi lớp học thành công  !!!",
        class: lophoc,
      });
    } else {
      console.log("Không tìm thấy class");
      res.status(200).json({ message: "class not found!!!" });
    }
  }
  // api hiện thông tin lớp học của course
  async findClassesByCourseID(req, res) {
    try {
      // // Get all classes for the course
      // const classes = await Class.find({ course: req.body.courseId })

      const courseID = req.body.courseID;

      const classes = await Class.find({ course: courseID });

      let classInfo = [];

      // Iterate over each class
      for (let cls of classes) {
        // Find the course associated with the class
        const course = await Course.findOne({ _id: cls.course });

        // Push the class information to the array
        classInfo.push({
          classCode: cls.classCode,
          courseName: course.courseName, // Use the course name instead of the class name
          className: cls.className,
          maxStudents: cls.maxStudents,
          registered: cls.currentStudents.length,
          status: cls.status,
        });
      }
      res.status(200).json({ message: "Get classes successfully!!!", classInfo: classInfo });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // get all class
  async getAllClass(req, res) {
    try {
      const classes = await Class.find();
      res.status(200).json({ message: "Get all classes successfully!!!", classes: classes });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //delete class
  async deleteClass(req, res) {
    const classCode = req.body.classCode;
    const classData = await Class.findOne({ classCode: classCode });
    if (classData) {
      await Class.deleteOne({ classCode: classCode });
      res.status(200).json({ message: "Delete class successfully!!!" });
    }
  }
  //confrimWaitList
  async confrimWaitList(req, res) {
    const classCode = req.body.classCode;
    const classData = await Class.findOne({ classCode: classCode });

    if (classData) {
      //push student from waitlist to currentStudents
      classData.currentStudents.push(...classData.waitlist);
      classData.waitlist = [];
      classData.save();
      res.status(200).json({ message: "Confrim waitlist successfully!!!" });
    } else {
      res.status(404).json({ message: "Class not in waitlist!!!" });
    }
  }

  //cancelWaitList
  async cancelWaitList(req, res) {
    const classCode = req.body.classCode;
    const classData = await Class.findOne({ classCode: classCode });
    if (classData) {
      for (let studentID of classData.waitlist) {
        const student = await Student.findOne({ _id: new ObjectId(studentID) });
        if (student) {
          console.log("student: ", student);
          console.log("classData._id ", classData._id);
          await Student.updateOne({ _id: new ObjectId(student._id) }, { $pull: { class: { classCode: new ObjectId(classData._id) } } });
        }
      }
      classData.waitlist = [];
      classData.save();
      res.status(200).json({ message: "Cancel waitlist successfully!!!" });
    } else {
      res.status(404).json({ message: "Class not in wait  list!!!" });
    }
  }
}

export default new ClassController();
