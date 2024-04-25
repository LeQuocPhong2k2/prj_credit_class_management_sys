import Registration from '../models/Registration.js'

class RegistrationController {
  // get Registration by registrationID
  async findRegistrationByRegistrationID(req, res) {
    const registrationID = req.body.registrationID
    const registration = await Registration.findOne({ _id: registrationID })
    if (registration) {
      console.log('Lấy registration thành công')
      res.status(200).json({
        message: 'Get registration successfully!!!',
        registration: registration,
      })
    } else {
      console.log('Không tìm thấy registration')
      res.status(200).json({ message: 'registration not found!!!' })
    }
  }
}
export default new RegistrationController()
