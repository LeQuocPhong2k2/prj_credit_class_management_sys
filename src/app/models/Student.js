import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'

const StudentSchema = new Schema({
  account_id: { type: Schema.Types.ObjectId, ref: 'Account' },
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
  dateOfBirth: Date,
  gender: Boolean,
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  major: { type: Schema.Types.ObjectId, ref: 'Major' },
  registeredCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  totalCredits: Number,
  GPA: Number,
})
export default mongoose.model('Student', StudentSchema)