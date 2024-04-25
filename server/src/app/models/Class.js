import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'
const ClassSchema = new Schema({
  className: String,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  teacher: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
  maxStudents: Number,
  currentStudents: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  waitlist: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
})
export default mongoose.model('Class', ClassSchema)
