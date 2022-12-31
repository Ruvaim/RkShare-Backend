import express from 'express';
import { downloadFile } from '../controllers/download.js';

const router = express.Router();

router.get('/files/download/:uuid', downloadFile);

export default router;
