import Major from '../models/Major.js'

class MajorController {
  // get major by majorID
  async findMajorByMajorID(req, res) {
    const majorID = req.body.majorID
    const major = await Major.findOne({ _id: majorID })
    if (major) {
      console.log('Lấy major thành công')
      res.status(200).json({
        message: 'Get major successfully!!!',
        major: major,
      })
    } else {
      console.log('Không tìm thấy major')
      res.status(200).json({ message: 'major not found!!!' })
    }
  }
}
export default new MajorController()
