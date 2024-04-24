import { mongoose } from 'mongoose'
import { Schema } from 'mongoose'

const TeacherSchema = new Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
})

export default mongoose.model('Teacher', TeacherSchema)
