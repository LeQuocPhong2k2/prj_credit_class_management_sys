import Course from "../models/Course.js";
import Major from "../models/Major.js";
import Student from "../models/Student.js";
import { ObjectId } from "mongodb";

class CourseController {
  //get Course đăng ký mới
  async getCourseNew(req, res) {
    const account_id = req.body.account_id;
    const major_id = req.body.major_id;
    try {
      const coursesDone = await Student.aggregate([
        {
          $match: {
            account_id: new ObjectId(account_id),
          },
        },
        {
          $lookup: {
            from: "class",
            localField: "class.classCode",
            foreignField: "_id",
            as: "class",
          },
        },
        {
          $project: {
            "class.course": 1,
          },
        },
      ]);

      const major = await Major.aggregate([
        {
          $match: {
            _id: new ObjectId(major_id),
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courses",
            foreignField: "_id",
            as: "courses",
          },
        },
        {
          $unwind: "$courses",
        },
        {
          $match: {
            "courses._id": { $nin: coursesDone[0].class.map((e) => e.course) },
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courses.prerequisites",
            foreignField: "_id",
            as: "courses.prerequisites",
          },
        },
        {
          $project: {
            _id: "$courses._id",
            courseCode: "$courses.courseCode",
            courseName: "$courses.courseName",
            courseCredit: "$courses.credits",
            elective: "$courses.elective",
            prerequisites: "$courses.prerequisites.courseCode",
          },
        },
      ]);

      res.status(200).json({ message: "Get course not clean successfully!!!", courseNotClean: major });
    } catch (err) {
      res.status(500).json({ message: "Server errorr" });
    }
  }

  //get Course by status [Học lại, Học cải thiện]
  async getCourseByStatus(req, res) {
    const account_id = req.body.account_id;
    const status = req.body.status;
    try {
      const courseReCleans = await Student.aggregate([
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
            "class.status": status,
          },
        },
        {
          $lookup: {
            from: "class",
            localField: "class.classCode",
            foreignField: "_id",
            as: "class.classCode",
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "class.classCode.course",
            foreignField: "_id",
            as: "class.classCode.course",
          },
        },
        {
          $project: {
            courseCode: "$class.classCode.course.courseCode",
            courseName: "$class.classCode.course.courseName",
            courseCredit: "$class.classCode.course.credits",
            elective: "$class.classCode.course.elective",
            prerequisites: "$class.classCode.course.prerequisites",
          },
        },
      ]);
      if (courseReCleans.length > 0) {
        res.status(200).json({ message: "Get course clean successfully!!!", courseReCleans: courseReCleans });
      } else {
        res.status(200).json({ message: "ERR_404", courseReCleans: courseReCleans });
      }
    } catch (err) {
      res.status(500).json({ message: "Server errorr" });
    }
  }

  //get Course của ngành
  async getAllCourseOfMajor(req, res) {
    const major_id = req.body.major_id;
    const major = await Major.findOne({ _id: major_id });
    let resultData = [];
    if (major) {
      let promises = major.courses.map(async (e) => {
        const course = await Course.findOne({ _id: e });
        let prerequisites;
        const coursePrerequisites = await Promise.all(
          course.prerequisites.map(async (prerequisiteId) => {
            const prerequisiteCourse = await Course.findById(prerequisiteId);
            return prerequisiteCourse.courseCode.concat("(b)");
          })
        );
        prerequisites = await Promise.all(coursePrerequisites);
        return { courseCode: course.courseCode, courseName: course.courseName, courseCredit: course.credits, elective: course.elective, prerequisites: prerequisites };
      });
      resultData = await Promise.all(promises);
      res.status(200).json({ message: "Get course successfully!!!", courses: resultData });
    } else {
      console.log("Không tìm thấy major");
      res.status(404).json({ message: "major not found!!!" });
    }
  }

  // get Course by courseID
  async findCourseByCourseID(req, res) {
    const courseID = req.body.courseID;
    const course = await Course.findOne({ _id: courseID });
    if (course) {
      console.log("Lấy course thành công");
      res.status(200).json({
        message: "Get course successfully!!!",
        course: course,
      });
    } else {
      console.log("Không tìm thấy course");
      res.status(200).json({ message: "course not found!!!" });
    }
  }
  // lấy tên môn học và số tín chỉ từ courseID
  async findCoursesByCourseIDs(req, res) {
    //const courseIDs = JSON.parse(req.body.courseIDs)
    let courseIDs = req.body.courseIDs;
    console.log("courseIDs được truyền qua server là : " + courseIDs);
    // kiểm tra nếu courseIDs không phải là 1 ObjectID thì chuyển qua JSON.parse

    if (typeof courseIDs === "string") {
      courseIDs = JSON.parse(courseIDs);
    }

    const courses = await Course.find({
      _id: { $in: courseIDs },
    });

    if (courses.length > 0) {
      console.log("Lấy courses thành công");
      res.status(200).json({
        message: "Get courses successfully!!!",
        courses: courses.map((course) => ({
          courseName: course.courseName,
          credits: course.credits,
          courseCode: course.courseCode,
        })),
      });
    } else {
      console.log("Không tìm thấy courses");
      res.status(200).json({ message: "Courses not found!!!" });
    }
  }

  async pendingCourses(req, res) {
    const studentID = req.body.studentID;

    // Lấy tất cả các khóa học
    const allCourses = await Course.find();

    // Lấy tất cả các đăng ký của học sinh
    const studentRegistrations = await Registration.find({ student: studentID });

    // Trích xuất ID của các khóa học từ các đăng ký
    const registeredCourseIds = studentRegistrations.map((reg) => reg.course.toString());

    // Lọc ra các khóa học mà học sinh chưa đăng ký
    const pendingCourses = allCourses.filter((course) => !registeredCourseIds.includes(course._id.toString()));

    if (pendingCourses.length > 0) {
      console.log("Lấy pendingCourses thành công");

      // Trích xuất chỉ các thuộc tính cần thiết từ mỗi khóa học
      const simplifiedPendingCourses = await Promise.all(
        pendingCourses.map(async (course) => {
          // kiểm tra néu mà elective = false thì nó là môn bắt buộc thì chữ sẽ là BB
          // ngược lại nếu elective = true thì chữ sẽ là Tự chọn
          let electiveText;
          if (course.elective === false) {
            electiveText = "BB";
          } else {
            electiveText = "Tự chọn";
          }

          // Lấy thông tin về các khóa học tiên quyết
          const prerequisites = await Promise.all(
            course.prerequisites.map(async (prerequisiteId) => {
              const prerequisiteCourse = await Course.findById(prerequisiteId);
              return prerequisiteCourse.courseCode.concat(" (b)");
            })
          );

          return {
            courseName: course.courseName,
            courseCode: course.courseCode,
            credits: course.credits,
            elective: electiveText,
            prerequisites: prerequisites,
          };
        })
      );

      res.status(200).json({
        message: "Lấy ra các môn học phần đang chờ đăng ký thành công!!!",
        pendingCourses: simplifiedPendingCourses,
      });
    } else {
      console.log("Không tìm thấy pendingCourses");
      res.status(200).json({ message: "PendingCourses not found!!!" });
    }
  }
}
export default new CourseController();
