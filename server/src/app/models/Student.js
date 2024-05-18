import { mongoose } from "mongoose";
import { Schema } from "mongoose";

const classDetailSchema = new Schema({
  classCode: { type: Schema.Types.ObjectId, ref: "Class" },
  dateRegister: String,
  grank: String,
  mark: String,
  status: String,
  group: String,
});

const StudentSchema = new Schema({
  userName: String,
  email: String,
  dateOfBirth: String,
  gender: String,
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  major: { type: Schema.Types.ObjectId, ref: "Major" },
  account_id: { type: Schema.Types.ObjectId, ref: "Account" },
  definiteClass: String,
  class: [classDetailSchema],
});
export default mongoose.model("Student", StudentSchema);
