import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    goals: { type: Number, default: 0 },
    receipts: { type: [String], default: [] }
  }
);

// Create the model
const UserModel = mongoose.model('User', User);

// Drop the userId index if it exists
// This will run after the model is connected to the database
mongoose.connection.on('connected', async () => {
  try {
    await UserModel.collection.dropIndex('userId_1');
    console.log('Successfully dropped userId_1 index');
  } catch (error) {
    // Index might not exist, which is fine
    console.log('Note: userId_1 index might not exist or could not be dropped', error.message);
  }
});

export default UserModel;
