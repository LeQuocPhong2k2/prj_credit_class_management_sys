import Account from "../models/Account.js";
import Teacher from "../models/Teacher.js";

class TeacherController {
  async getAllTeacher(req, res) {
    try {
      const teachers = await Teacher.find();
      res.status(200).json({
        message: "Get all teacher successfully!!!",
        teachers: teachers,
      });
    } catch (error) {
      res.status(500).json({ message: "ERR_500" });
    }
  }

  async findTeacherByID(req, res) {
    const teacher_id = req.body.teacher_id;
    try {
      const teacher = await Teacher.findOne({ _id: teacher_id });
      if (teacher) {
        res.status(200).json({
          message: "Get teacher successfully!!!",
          teacher: teacher,
        });
      } else {
        res.status(200).json({ message: "ERR_404", teacher: teacher });
      }
    } catch (error) {
      res.status(500).json({ message: "ERR_500" });
    }
  }

  async findTeacherByAccountID(req, res) {
    const account_id = req.body.account_id;
    console.log("account_id: " + account_id);

    // từ account đã đăng nhập thành công thì tìm ra teacher tương ứng với account đó
    const teacher = await Teacher.findOne({ account_id: account_id });
    console.log("teacher: " + teacher);
    if (teacher) {
      console.log("Lấy teacher từ account thành công ");
      res.status(200).json({
        message: "Login successfully!!!",
        teacher: teacher,
      });
    } else {
      console.log("Không tìm thấy teacher từ account");
      res.status(200).json({ message: "teacher not found!!!" });
    }
  }
}
export default new TeacherController();
