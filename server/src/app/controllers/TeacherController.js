import Account from '../models/Account.js'
import Teacher from '../models/Teacher.js'

class TeacherController {
  async findTeacherByAccountID(req, res) {
    const account_id = req.body.account_id
    console.log('account_id: ' + account_id)

    // từ account đã đăng nhập thành công thì tìm ra teacher tương ứng với account đó
    const teacher = await Teacher.findOne({ account_id: account_id })
    console.log('teacher: ' + teacher)
    if (teacher) {
      console.log('Lấy teacher từ account thành công ')
      res.status(200).json({
        message: 'Login successfully!!!',
        teacher: teacher,
      })
    } else {
      console.log('Không tìm thấy teacher từ account')
      res.status(200).json({ message: 'teacher not found!!!' })
    }
  }
}
export default new TeacherController()
