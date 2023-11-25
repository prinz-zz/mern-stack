import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
import { errorHandler } from './middleware/errorHandler.js';
import { dbConnection } from './config/dbConnection.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();
dbConnection();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(cookieParser());

app.get('/api', (req, res) => res.send('Server ready'));
app.use('/api/users/', userRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use(errorHandler);

app.listen(port, () => console.log("Server started on Port :", port));