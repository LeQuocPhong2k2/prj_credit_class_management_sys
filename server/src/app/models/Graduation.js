import { mongoose } from "mongoose";
import { Schema } from "mongoose";
const GraduationSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "Student" },
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  major: { type: Schema.Types.ObjectId, ref: "Major" },
  status: String,
  timestamp: Date,
  degree: String,
  publicProfile: Boolean,
  employmentHistory: [Object],
  surveys: [{ type: Schema.Types.ObjectId, ref: "Survey" }],
});
export default mongoose.model("Graduation", GraduationSchema);
