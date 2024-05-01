import Course from '../models/Course.js'

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

  // get CourseName by courseID
}
export default new CourseController()
