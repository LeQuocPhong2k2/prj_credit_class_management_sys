import Account from '../models/Account.js'
import Student from '../models/Student.js'

class AccountController {
  async login(req, res) {
    try {
      const { userCode, password, accountType } = req.body
      const account = await Account.findOne({
        userCode: userCode,
      })

      if (!account) {
        return res.status(200).json({ message: 'Không tìm thấy tài khoản' })
      }
      if (
        account.password !== password ||
        account.accountType !== accountType
      ) {
        return res
          .status(200)
          .json({ message: 'Password or AccountType not match' })
      }
      const account_id = account._id
      if (account && account.password === password) {
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
