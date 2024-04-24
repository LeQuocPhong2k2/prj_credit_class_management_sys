import Account from '../models/Account.js'

class AccountController {
  // async login web
  async login(req, res) {
    // // lấy tất cả dữ liệu trong accounts
    // try {
    //   const accounts = await Account.find()
    //   if (accounts.length === 0) {
    //     return res.status(400).json({ message: 'Không tìm thấy tài khoản' })
    //   }
    //   return res.status(200).json({
    //     message: 'Login Success',
    //     accounts: accounts,
    //   })
    // } catch (err) {
    //   return res.status(500).json({ message: 'Server Error' })
    // }

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
      return res.status(200).json({
        message: 'Login Success',
        account: account,
      })
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' })
    }
  }
}
export default new AccountController()
