import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    goals: { type: Number, default: 0 },
    receipts: { type: [String], default: [] }
  }
)

export default mongoose.model('User', User);
