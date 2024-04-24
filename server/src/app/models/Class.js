import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'
const ClassSchema = new Schema(
  {
    className: String,
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    teacher: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
    maxStudents: Number,
    currentStudents: [{ type: Schema.Types.Mixed, ref: 'Student' }],
    waitlist: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  },
  { collection: 'class' }
)
// currentStudents: [Schema.Types.Mixed] cho phép lưu nhiều kiểu dữ liệu khác nhau để dễ dàng test
export default mongoose.model('Class', ClassSchema)
