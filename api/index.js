import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('CONNECTED TO MONGODB');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});

app.listen(9000, () => {
  connect();
  console.log('Connected to backend!');
});
