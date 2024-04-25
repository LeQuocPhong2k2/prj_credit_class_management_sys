import Account from "../models/Account.js";
import Student from "../models/Student.js";

class AccountController {
  // async login web
  async login(req, res) {
    try {
      const { userCode, password, accountType } = req.body;
      const account = await Account.findOne({
        userCode: userCode,
      });

      console.log("Dữ liệu nhận được", req.body);
      console.log("account", account);
      if (!account) {
        console.log('Không tìm thấy tài khoản')
        return res.status(200).json({ message: 'Không tìm thấy tài khoản' })
      }
      if (
        account.password !== password ||
        account.accountType !== accountType
      ) {
        console.log('Password or AccountType not match')
        return res
          .status(200)
          .json({ message: 'Password or AccountType not match' })
        return res.status(400).json({ message: "Không tìm thấy tài khoản" });
      }
      if (account.password !== password || account.accountType !== accountType) {
        return res.status(400).json({ message: "Password or AccountType not match" });
      }
      // lấy biến account_id từ account
      const account_id = account._id;
      if (account && account.password === password) {
        console.log("Đăng nhập thành công");
        res.status(200).json({
          message: "Login successfully!!!",
          account_id: account_id,
        });
      }
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
  // viết 1 cái hàm đăng ký cho sinh viên
}
export default new AccountController();
