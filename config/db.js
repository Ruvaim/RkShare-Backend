// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

// const mongoose = require('mongoose');

function connectDB() {
  //Database connection

  //   mongoose.set('strictQuery', true);

  mongoose.set('strictQuery', false);

  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  });
  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('DB CONNECTED.');
  });
}

// module.exports = connectDB;
export default connectDB;
