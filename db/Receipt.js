import mongoose from 'mongoose';

const Receipt = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    receiptId: { type: String, required: true },
    receiptData: { type: String, required: true },
  }
)

export default mongoose.model('Receipt', Receipt);