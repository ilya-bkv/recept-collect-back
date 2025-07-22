import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router.js';

dotenv.config();

const PORT = 5000;
const DB_HOST = process.env.MOGO_DB

const app = express();

app.use(express.json());
app.use('/api', router);

const startApp = async () => {
  try {
    await mongoose.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, 'localhost', () => {
      console.log('SEVER listening on port 5000')
    })
  } catch (e) {
    console.error(e);
  }
}

startApp()
