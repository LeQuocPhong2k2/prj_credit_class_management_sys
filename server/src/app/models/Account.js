import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Account = new Schema({
  userCode: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
})
export default mongoose.model('Account', Account)
