import applicationRouter from './routes/applicationRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';
import { connectDb } from './database/dbConnection.js';
import { errorMiddleware } from './middleware/error.js';

const app = express();
// Environment variables
dotenv.config({ path: './config/config.env' });

// Middlewares
app.use(
   cors({
      origin: [process.env.FRONTEND_URL],
      methods: ['GET', 'POST', 'DELETE', 'PUT'],
      credentials: true,
   }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
   }),
);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);

connectDb();

app.use(errorMiddleware);

export default app;
