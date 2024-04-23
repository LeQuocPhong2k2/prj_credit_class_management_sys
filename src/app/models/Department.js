import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'
const DepartmentSchema = new Schema({
  departmentName: String,
  majors: [{ type: Schema.Types.ObjectId, ref: 'Major' }],
})
export default mongoose.model('Department', DepartmentSchema)
