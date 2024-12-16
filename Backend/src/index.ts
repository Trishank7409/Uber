import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import {router} from './routes/user.routes'
import { captainRouter } from './routes/captain.routes';
import {initDB} from './db/db.config'
import morgan from 'morgan'
const app= express();
dotenv.config();
const port=process.env.PORT || 5000;
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  app.use(morgan(':method :url :status - :response-time ms'))
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))
  app.use(cookieParser())
  app.use('/v1/user',router)
  app.use('/v1/captain',captainRouter)
  app.use(cors(corsOpts));
  const startServer = async (): Promise<void> => {
    try {
      await initDB();
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Error starting the server:', error);
    }
  };
  
  startServer();