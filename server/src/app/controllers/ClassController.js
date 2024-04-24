import Class from '../models/Class.js'

class ClassController {
  // get Class by classID
  async findClassByClassID(req, res) {
    const classID = req.body.classID
    console.log('classID: ', classID)
    const lophoc = await Class.findOne({ _id: classID })
    if (lophoc) {
      console.log('Lấy class thành công')
      res.status(200).json({
        message: 'Get class successfully!!!',
        class: lophoc,
      })
    } else {
      console.log('Không tìm thấy class')
      res.status(200).json({ message: 'class not found!!!' })
    }
  }
}
export default new ClassController()
