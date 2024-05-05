import Account from "../models/Account.js";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

class AccountController {
  async login(req, res) {
    const { userCode, password, accountType } = req.body;
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
            "mk"
          );
          return res.status(200).json({
            message: "Login successful",
            account_id: account._id,
            token: token,
          });
        } else {
          return res.status(404).json({ message: "Account not found" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: "Server Error" });
      });
  }
}
export default new AccountController();
