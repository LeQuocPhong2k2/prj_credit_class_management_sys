import Class from '../models/Class.js'
import Course from '../models/Course.js'
import moment from 'moment-timezone'
class ClassController {
  // get Class by classID
  async findClassByClassID(req, res) {
    const classID = req.body.classID

    const lophoc = await Class.findOne({ _id: classID })

    // lấy tên môn học từ course trong lophoc
    const course_id = lophoc.course
    const course = await Course.findOne({ _id: course_id })

    if (lophoc) {
      console.log('Lấy class thành công')
      res.status(200).json({
        message: 'Get class successfully!!!',
        course_name: course.courseName,
        class: lophoc,
      })
    } else {
      console.log('Không tìm thấy class')
      res.status(200).json({ message: 'class not found!!!' })
    }
  }

  // create a new class
  async createClass(req, res) {
    const { className, course_id, maxStudents } = req.body
    // lấy danh sách teacher
    const teacher = req.body.list_teacherId

    // lấy tên classNameNew = className - course
    const classNameNew = className + ' ' + '-' + ' ' + course_id

    const newClass = new Class({
      className: classNameNew,
      course: course_id,
      teacher: Array.isArray(teacher) ? teacher : [teacher],
      maxStudents: maxStudents,
    })
    newClass.save()
    // chỗ này test hiện ra ngày giờ theo múi giờ VN
    const utcDate = newClass.registrationOpenTime // this is the date you fetched from MongoDB
    const vnDate = moment(utcDate).tz('Asia/Ho_Chi_Minh').format()
    console.log(vnDate)
    //---------
    console.log('Tạo class thành công')

    res
      .status(200)
      .json({ message: 'Create class successfully!!!', newClass: newClass })
  }
  // api lấy id của sinh viên và id của lớp học, sau đó thêm sinh viên vào lớp học trong mảng currentStudents
  async addStudentToClass(req, res) {
    const { studentID, classID } = req.body
    const lophoc = await Class.findOne({ _id: classID })
    console.log('lophoc: ', lophoc)
    if (lophoc) {
      console.log('Lấy class thành công')

      // kiểm tra xem mảng currentStudents đã có studentID đó chưa nếu có thì không thêm nữa
      if (lophoc.currentStudents.includes(studentID)) {
        console.log('Student đã có trong lớp học')
        return res.status(200).json({
          message: 'Sinh viên đã có trong lớp học !!!',
        })
      }
      // nếu mảng currentStudents đã đủ số lượng sinh viên thì không thêm nữa
      if (lophoc.currentStudents.length >= lophoc.maxStudents) {
        console.log('Lớp học đã đủ số lượng sinh viên')
        return res.status(200).json({
          message: 'Lớp học đã đủ số lượng sinh viên !!!',
        })
      }

      // thêm studentID vào mảng currentStudents
      lophoc.currentStudents.push(studentID)
      lophoc.save()
      res.status(200).json({
        message: 'Thêm sinh viên vào lớp học thành công  !!!',
        class: lophoc,
      })
    } else {
      console.log('Không tìm thấy class')
      res.status(200).json({ message: 'class not found!!!' })
    }
  }
  // hàm sinh viên rời khỏi lớp học
  async removeStudentFromClass(req, res) {
    const { studentID, classID } = req.body
    const lophoc = await Class.findOne({ _id: classID })
    console.log('lophoc: ', lophoc)
    if (lophoc) {
      console.log('Lấy class thành công')

      // kiểm tra xem mảng currentStudents đã có studentID đó chưa nếu có thì không thêm nữa
      if (!lophoc.currentStudents.includes(studentID)) {
        console.log('Student không có trong lớp học')
        return res.status(200).json({
          message: 'Sinh viên không có trong lớp học !!!',
        })
      }

      // thêm studentID vào mảng currentStudents
      lophoc.currentStudents.pull(studentID)
      lophoc.save()
      res.status(200).json({
        message: 'Xóa sinh viên khỏi lớp học thành công  !!!',
        class: lophoc,
      })
    } else {
      console.log('Không tìm thấy class')
      res.status(200).json({ message: 'class not found!!!' })
    }
  }
}
export default new ClassController()
