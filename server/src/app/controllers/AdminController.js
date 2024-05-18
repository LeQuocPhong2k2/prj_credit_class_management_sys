import Admin from '../models/Admin.js'

class AdminController {
  // api lấy thông tin admin
  async getInfoAdmin(req, res) {
    const account_id = req.body.account_id
    const admin = await Admin.findOne({ account_id: account_id })
    if (admin) {
      return res.status(200).json(admin)
    } else {
      return res.status(404).json({ message: 'Admin not found' })
    }
  }
}
export default new AdminController()
