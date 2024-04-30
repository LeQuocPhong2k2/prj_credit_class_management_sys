import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'
const RegistrationSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  status: String,
  timestamp: Date,
  emailSent: Boolean,
})

export default mongoose.model('Registration', RegistrationSchema)
