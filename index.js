import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.MOGO_DB
const SERVER_HOST = process.env.SERVER_HOST

const app = express();

app.use(cors({
  origin: [
    'http://127.0.0.1:5000', // dev
    'https://recept-collect-back.onrender.com' // prod
  ],
  credentials: true
}));

app.use(express.json());
app.use('/api', router);

const startApp = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('!!! SERVER_HOST:', SERVER_HOST)
    app.listen(PORT, SERVER_HOST, () => {
      console.log(`SERVER listening on port ${PORT}`)
    })
  } catch (e) {
    console.error(e);
  }
}

startApp()
