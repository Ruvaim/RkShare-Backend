import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import filesRoutes from './routes/files.js';
import showRoutes from './routes/show.js';
import downloadRoutes from './routes/download.js';
import emailRoutes from './routes/email.js';
import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const express = require('express');

// const connectDB = require('./config/db.js');
// const filesRoutes = require('./routes/files.js');
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
connectDB();

//cors
// const corsOptions = {
//   origin: process.env.ALLOWED_CLIENTS.split(','),
// };

// app.use(cors(corsOptions));

//Template engine

// const __filename = fileURLToPath(import.meta.url);
// let __dirname = dirname(__filename);
const __dirname = path.resolve();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
//Routes
app.use('/api', filesRoutes);
app.use('/api', showRoutes);
app.use('/api', downloadRoutes);
app.use('/api', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
