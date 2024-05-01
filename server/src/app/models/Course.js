import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'

const CourseSchema = new Schema({
  courseName: String,
  courseCode: String,
  credits: Number,
  prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  elective: Boolean,
  hasPractical: Boolean,
})
export default mongoose.model('Course', CourseSchema)
