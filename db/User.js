import mongoose from 'mongoose';

const ReceiptSchema = new mongoose.Schema({
  receiptId: { type: String, required: true },
  receiptData: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const User = new mongoose.Schema(
  {
    id: { type: String, default: null, unique: true },
    goals: { type: Number, default: 0 },
    receipts: { type: [ReceiptSchema], default: [] }
  }
)

export default mongoose.model('User', User);