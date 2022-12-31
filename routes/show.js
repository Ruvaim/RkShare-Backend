import express from 'express';
import { showLink } from '../controllers/show.js';

const router = express.Router();

router.get('/files/:uuid', showLink);

export default router;
