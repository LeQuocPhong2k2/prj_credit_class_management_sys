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
  // // get Registration by studentID
  // async findRegistrationByStudentID(req, res) {
  //   // console.log('findRegistrationByStudentID')
  //   // res.status(200).json({ message: 'findRegistrationByStudentID' })
  //   const studentID = req.body.studentID
  //   const registration = await Registration.findOne({ student: studentID })
  //   // từ course trong registration tìm ra coursecode tương ứng

  //   if (registration) {
  //     const course_id = registration.course
  //     const course = await Course.findOne({ _id: course_id })
  //     // từ course_id tìm ra class tương ứng
  //     const lophoc = await Class.findOne({ course: course_id })
  //     let practiceClass

  //     // chỗ này đang kiểm tra nếu là môn thực hành thì  gán nhóm thực hành vào bằng 1 còn không thì để trống
  //     if (course.hasPractical === true) {
  //       practiceClass = 1
  //     } else {
  //       practiceClass = ''
  //     }
  //     const timestamp = new Date(registration.timestamp)
  //     const formattedTimestamp = `${timestamp
  //       .getDate()
  //       .toString()
  //       .padStart(2, '0')}/${(timestamp.getMonth() + 1)
  //       .toString()
  //       .padStart(2, '0')}/${timestamp.getFullYear()}`

  //     // console.log(formattedTimestamp) // Logs "01/03/2024"
  //     console.log('Lấy registration thành công')
  //     res.status(200).json({
  //       message: 'Get registration successfully!!!',
  //       // registration: registration,
  //       courseCode: course.courseCode,
  //       courseName: course.courseName,
  //       className: lophoc.className,
  //       credits: course.credits,
  //       practiceClass: practiceClass,
  //       courseFee: course.courseFee,
  //       paymentStatus: registration.paymentStatus,
  //       timestamp: formattedTimestamp,
  //     })
  //   } else {
  //     console.log('Không tìm thấy registration')
  //     res.status(200).json({ message: 'Không tìm thấy registration' })
  //   }
  // }
  async findRegistrationByStudentID(req, res) {
    const studentID = req.body.studentID
    const registrations = await Registration.find({ student: studentID })

    if (registrations.length > 0) {
      let registrationInfo = []

      for (let registration of registrations) {
        const course_id = registration.course
        const course = await Course.findOne({ _id: course_id })
        const lophoc = await Class.findOne({ course: course_id })

        let practiceClass
        if (course.hasPractical === true) {
          practiceClass = 1
        } else {
          practiceClass = ''
        }

        const timestamp = new Date(registration.timestamp)
        const formattedTimestamp = `${timestamp
          .getDate()
          .toString()
          .padStart(2, '0')}/${(timestamp.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${timestamp.getFullYear()}`

        registrationInfo.push({
          courseCode: course.courseCode,
          courseName: course.courseName,
          className: lophoc.className,
          credits: course.credits,
          practiceClass: practiceClass,
          courseFee: course.courseFee,
          paymentStatus: registration.paymentStatus,
          timestamp: formattedTimestamp,
        })
      }

      res.status(200).json({
        message: 'Get registration successfully!!!',
        registrationInfo: registrationInfo,
      })
    } else {
      console.log('Không tìm thấy registration')
      res.status(200).json({ message: 'Không tìm thấy registration' })
    }
  }
}
export default new RegistrationController()
