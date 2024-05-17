import Account from '../models/Account.js'
import Student from '../models/Student.js'
import jwt from 'jsonwebtoken'

class AccountController {
  async login(req, res) {
    const { userCode, password, accountType } = req.body
    const account = await Account.findOne({
      userCode: userCode,
      password: password,
    })
      .then((account) => {
        if (account) {
          const token = jwt.sign(
            {
              userCode: account.userCode,
              accountType: account.accountType,
            },
            'mk' // khóa bí mật
          )
          return res.status(200).json({
            message: 'Login successful',
            account_id: account._id,
            token: token,
          })
        } else {
          return res.status(404).json({ message: 'Account not found' })
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: 'Server Error' })
      })
  }

  // api check xem account dăng nhập là student hay admin truyền vào _id và xem vào accountType của account đó
  async checkAccountType(req, res) {
    const account_id = req.body.account_id
    const account = await Account.findOne({ _id: account_id })
    if (account) {
      const account_type = account.accountType
      return res.status(200).json({ account_type: account_type })
    } else {
      return res.status(404).json({ message: 'Account not found' })
    }
  }
}
export default new AccountController()
