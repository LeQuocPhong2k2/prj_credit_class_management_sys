import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'

const StudentSchema = new Schema({
  account_id: { type: Schema.Types.ObjectId, ref: 'Account' },
  userName: String,
  email: String,
  dateOfBirth: Date,
  gender: String,
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  major: { type: Schema.Types.ObjectId, ref: 'Major' },
  registeredCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  totalCredits: Number,
  GPA: Number,
  definiteClass: String,
  semesterRegistration: String,
  registrationType: String,
})
export default mongoose.model('Student', StudentSchema)
