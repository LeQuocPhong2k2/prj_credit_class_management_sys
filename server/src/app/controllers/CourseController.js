import Course from '../models/Course.js'
import Registration from '../models/Registration.js'

class CourseController {
  // get Course by courseID
  async findCourseByCourseID(req, res) {
    const courseID = req.body.courseID
    const course = await Course.findOne({ _id: courseID })
    if (course) {
      console.log('Lấy course thành công')
      res.status(200).json({
        message: 'Get course successfully!!!',
        course: course,
      })
    } else {
      console.log('Không tìm thấy course')
      res.status(200).json({ message: 'course not found!!!' })
    }
  }
  // lấy tên môn học và số tín chỉ từ courseID
  async findCoursesByCourseIDs(req, res) {
    //const courseIDs = JSON.parse(req.body.courseIDs)
    let courseIDs = req.body.courseIDs
    console.log('courseIDs được truyền qua server là : ' + courseIDs)
    // kiểm tra nếu courseIDs không phải là 1 ObjectID thì chuyển qua JSON.parse

    if (typeof courseIDs === 'string') {
      courseIDs = JSON.parse(courseIDs)
    }

    const courses = await Course.find({
      _id: { $in: courseIDs },
    })

    if (courses.length > 0) {
      console.log('Lấy courses thành công')
      res.status(200).json({
        message: 'Get courses successfully!!!',
        courses: courses.map((course) => ({
          courseName: course.courseName,
          credits: course.credits,
          courseCode: course.courseCode,
        })),
      })
    } else {
      console.log('Không tìm thấy courses')
      res.status(200).json({ message: 'Courses not found!!!' })
    }
  }

  // api hiện các môn học mà sinh viên chưa đăng ký trong course
  async pendingCourses(req, res) {
    const studentID = req.body.studentID

    // Lấy tất cả các khóa học
    const allCourses = await Course.find()

    // Lấy tất cả các đăng ký của học sinh
    const studentRegistrations = await Registration.find({ student: studentID })

    // Trích xuất ID của các khóa học từ các đăng ký
    const registeredCourseIds = studentRegistrations.map((reg) =>
      reg.course.toString()
    )

    // Lọc ra các khóa học mà học sinh chưa đăng ký
    const pendingCourses = allCourses.filter(
      (course) => !registeredCourseIds.includes(course._id.toString())
    )
    if (pendingCourses.length > 0) {
      console.log('Lấy pendingCourses thành công')

      // kiểm tra néu mà elective = false thì nó là môn bắt buộc thì chữ sẽ là BB

      // Trích xuất chỉ các thuộc tính cần thiết từ mỗi khóa học
      const simplifiedPendingCourses = pendingCourses.map((course) => {
        // kiểm tra néu mà elective = false thì nó là môn bắt buộc thì chữ sẽ là BB
        // ngược lại nếu elective = true thì chữ sẽ là Tự chọn
        let electiveText
        if (course.elective === false) {
          electiveText = 'BB'
        } else {
          electiveText = 'Tự chọn'
        }

        return {
          courseName: course.courseName,
          courseCode: course.courseCode,
          credits: course.credits,
          elective: electiveText,
        }
      })

      res.status(200).json({
        message: 'Lấy ra các môn học phần đang chờ đăng ký thành công!!!',
        pendingCourses: simplifiedPendingCourses,
      })
    } else {
      console.log('Không tìm thấy pendingCourses')
      res.status(200).json({ message: 'PendingCourses not found!!!' })
    }
  }
}
export default new CourseController()
