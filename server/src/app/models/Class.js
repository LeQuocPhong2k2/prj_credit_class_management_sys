import mongoose from "mongoose";
const { Schema } = mongoose;

const ClassDetailSchema = new Schema({
  facility: String,
  house: String,
  room: String,
  teacher: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  type: String,
  day: String,
  lesson: String,
});

const TimeSchema = new Schema({
  registrationOpenTime: { type: Date, default: Date.now },
  registrationCloseTime: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  }, // 1 month later
  startTime: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000),
  }, // 1 day after registrationCloseTime
  endTime: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 + 90 * 24 * 60 * 60 * 1000),
  }, // 3 months after startTime
});

const ClassSchema = new Schema(
  {
    className: String,
    classCode: String,
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    //teacher: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
    maxStudents: Number,
    semester: String,
    currentStudents: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    waitlist: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    time: TimeSchema,
    status: String,
    classDetails: [ClassDetailSchema],
  },
  { collection: "class" }
);

export default mongoose.model("Class", ClassSchema);
