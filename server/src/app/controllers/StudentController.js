import Student from "../models/Student.js";
import Majoir from "../models/Major.js";
import Account from "../models/Account.js";

class StudentController {
  // trả về 1 student từ account_id
  async findStudentByAccountID(req, res) {
    const account_id = req.body.account_id;
    const student = await Student.findOne({ account_id: account_id });

    if (student) {
      const major_id = student.major;
      const major = await Majoir.findOne({ _id: major_id });
      const account = await Account.findOne({ _id: account_id });
      res.status(200).json({
        message: "Login successfully!!!",
        student_id: student._id,
        student: student,
        majorName: major.majorName,
        account: account,
      });
    } else {
      console.log("Không tìm thấy student từ account");
      res.status(200).json({ message: "student not found!!!" });
    }
  }
}
export default new StudentController();
