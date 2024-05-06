import Student from "../models/Student.js";
import Majoir from "../models/Major.js";
import Account from "../models/Account.js";

class StudentController {
  // trả về 1 student từ account_id
  async findStudentByAccountID(req, res) {
    const account_id = req.body.account_id;
    const student = await Student.findOne({ account_id: account_id });

    if (student) {
      res.status(200).json({
        message: "Login successfully!!!",
        student: student,
      });
    } else {
      console.log("Không tìm thấy student từ account");
      res.status(404).json({ message: "student not found!!!" });
    }
  }
}
export default new StudentController();
