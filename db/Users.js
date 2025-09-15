import mongoose from 'mongoose';

// Define the schema for individual user objects within the array
const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  goals: { type: Number, default: 0 },
  receipts: { type: [String], default: [] }
});

// Define the schema for the Users collection that will store an array of users
const Users = new mongoose.Schema({
  users: { type: [UserSchema], default: [] }
});

export default mongoose.model('Users', Users);