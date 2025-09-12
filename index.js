import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.MOGO_DB;
const SERVER_HOST = process.env.SERVER_HOST;

const app = express();

// разрешаем запросы только с фронтовых доменов
const allowedOrigins = [
  'http://127.0.0.1:5173', // Vite dev
  'http://localhost:5173', // Vite from box
  'https://cheeki-ilyabkvs-projects.vercel.app' // front Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // Разрешаем без Origin (например, Postman) или если Origin есть в списке
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true
}));

// preflight for all routes
app.options('*', cors());

app.set('trust proxy', 1);
app.use(express.json());
app.use('/api', router);

const startApp = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('!!! SERVER_HOST:', SERVER_HOST);
    app.listen(PORT, SERVER_HOST, () => {
      console.log(`SERVER listening on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

startApp();
