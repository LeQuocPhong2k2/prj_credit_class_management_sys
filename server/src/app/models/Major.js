import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'
const MajorSchema = new Schema({
  majorName: String,
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
})

export default mongoose.model('Major', MajorSchema)
