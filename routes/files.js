import express from 'express';

import { postFiles } from '../controllers/files.js';

const router = express.Router();
// const router = require('express').Router();

router.post('/files', postFiles);

export default router;
