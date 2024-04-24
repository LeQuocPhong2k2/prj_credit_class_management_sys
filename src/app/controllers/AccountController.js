import Account from '../models/Account.js'
import Student from '../models/Student.js'

class AccountController {
  // async login web
  async login(req, res) {
    try {
      const { studentCode, password } = req.body
      // const account = await Account.findOne({
      //   studentCode: studentCode,
      // })
      const account = await Account.findOne({
        studentCode: studentCode,
      })
      console.log('Dữ liệu nhận được', req.body)
      console.log('account', account)
      if (!account) {
        return res.status(400).json({ message: 'Không tìm thấy tài khoản' })
      }
      if (account.password !== password) {
        return res.status(400).json({ message: 'Password not match' })
      }
      // return res.status(200).json({
      //   message: 'Login Success',
      //   account: account,
      // })
      // lấy biến account_id từ account
      const account_id = account._id
      if (account && account.password === password) {
        console.log('Đăng nhập thành công')
        res.status(200).json({
          message: 'Login successfully!!!',
          account_id: account_id,
        })
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' })
    }
  }
}
export default new AccountController()
