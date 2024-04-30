import Department from '../models/Department.js'

class DepartmentController {
  // get Department by departmentID
  async findDepartmentByDepartmentID(req, res) {
    const departmentID = req.body.departmentID
    const department = await Department.findOne({ _id: departmentID })
    if (department) {
      console.log('Lấy department thành công')
      res.status(200).json({
        message: 'Get department successfully!!!',
        department: department,
      })
    } else {
      console.log('Không tìm thấy department')
      res.status(200).json({ message: 'department not found!!!' })
    }
  }
}
export default new DepartmentController()
