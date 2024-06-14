import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import Food from './models/Food.js';
import { validationChain } from './validation.js';
import * as UserController from './controllers/UserController.js';
import checkAuth from './checkAuth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.9ww5wjm.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB', err));

    app.use(express.json());
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    
    app.get('/food', async (req, res) => {
      try {
        const foods = await Food.find();
        res.json(foods);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
    app.post('/user/register', validationChain, UserController.register);
    app.post('/user/login', validationChain, UserController.login);
    app.get('/auth/me', checkAuth, UserController.getUser);
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });