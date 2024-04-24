import Graduation from '../models/Graduation.js'

class GraduationController {
  // get Graduation by studentID
  async findGraduationByStudentID(req, res) {
    const studentID = req.body.studentID
    const graduation = await Graduation.findOne({ student: studentID })
    if (graduation) {
      console.log('Lấy graduation thành công')
      res.status(200).json({
        message: 'Get graduation successfully!!!',
        graduation: graduation,
      })
    } else {
      console.log('Không tìm thấy graduation')
      res.status(200).json({ message: 'graduation not found!!!' })
    }
  }
}
export default new GraduationController()
