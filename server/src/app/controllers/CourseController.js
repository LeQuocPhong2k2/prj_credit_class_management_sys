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
}
export default new CourseController()
