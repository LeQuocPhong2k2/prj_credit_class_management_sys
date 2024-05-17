import mongoose from 'mongoose'
const { Schema } = mongoose

const AdminSchema = new Schema({
  account_id: { type: Schema.Types.ObjectId, ref: 'Account' },
  userName: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Admin', AdminSchema, 'admin')
