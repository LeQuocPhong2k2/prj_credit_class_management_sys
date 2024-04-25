import Account from '../models/Account.js'
import Student from '../models/Student.js'

class StudentController {
  // trả về 1 student từ account_id
  async findStudentByAccountID(req, res) {
    const account_id = req.body.account_id
    // console.log('account_id: ' + account_id)

    // từ account đã đăng nhập thành công thì tìm ra student tương ứng với account đó
    const student = await Student.findOne({ account_id: account_id })
    // console.log('student: ' + student)

    if (student) {
      console.log('Lấy student từ account thành công ')
      res.status(200).json({
        message: 'Login successfully!!!',
        student: student,
      })
    } else {
      console.log('Không tìm thấy student từ account')
      res.status(200).json({ message: 'student not found!!!' })
    }
  }
}
export default new StudentController()
