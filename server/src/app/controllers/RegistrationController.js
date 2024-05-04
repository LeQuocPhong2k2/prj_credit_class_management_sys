import Registration from '../models/Registration.js'
import Course from '../models/Course.js'
import Class from '../models/Class.js'
class RegistrationController {
  // get Registration by registrationID
  async findRegistrationByRegistrationID(req, res) {
    const registrationID = req.body.registrationID
    const registration = await Registration.findOne({ _id: registrationID })
    if (registration) {
      console.log('Lấy registration thành công')
      res.status(200).json({
        message: 'Get registration successfully!!!',
        registration: registration,
      })
    } else {
      console.log('Không tìm thấy registration')
      res.status(200).json({ message: 'registration not found!!!' })
    }
  }
  // get Registration by studentID
  async findRegistrationByStudentID(req, res) {
    // console.log('findRegistrationByStudentID')
    // res.status(200).json({ message: 'findRegistrationByStudentID' })
    const studentID = req.body.studentID
    const registration = await Registration.findOne({ student: studentID })
    // từ course trong registration tìm ra coursecode tương ứng
    const course_id = registration.course
    const course = await Course.findOne({ _id: course_id })
    const courseCode = course.courseCode
    const courseName = course.courseName
    const credits = course.credits
    // từ course_id tìm ra class tương ứng
    const lophoc = await Class.findOne({ course: course_id })
    // console.log('lophoc: ' + lophoc)
    const className = lophoc.className.split(' - ')[0]
    const courseFee = course.courseFee
    let practiceClass
    if (lophoc.classDetails.length >= 2) {
      practiceClass = 1
    } else {
      practiceClass = ''
    }
    const paymentStatus = registration.paymentStatus
    const timestamp = new Date(registration.timestamp)
    const formattedTimestamp = `${timestamp
      .getDate()
      .toString()
      .padStart(2, '0')}/${(timestamp.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${timestamp.getFullYear()}`

    console.log(formattedTimestamp) // Logs "01/03/2024"

    if (registration) {
      console.log('Lấy registration thành công')
      res.status(200).json({
        message: 'Get registration successfully!!!',
        // registration: registration,
        courseCode: courseCode,
        courseName: courseName,
        className: className,
        credits: credits,
        practiceClass: practiceClass,
        courseFee: courseFee,
        paymentStatus: paymentStatus,
        timestamp: formattedTimestamp,
      })
    } else {
      console.log('Không tìm thấy registration')
      res.status(200).json({ message: 'Không tìm thấy registration' })
    }
  }
}
export default new RegistrationController()
