import mongoose from 'mongoose';

const Receipt = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    receiptData: { type: mongoose.Schema.Types.Mixed, required: true },
  }
)

export default mongoose.model('Receipt', Receipt);
