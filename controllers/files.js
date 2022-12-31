import multer from 'multer';
import path from 'path';
import File from '../Models/File.js';
import { v4 as uuidv4 } from 'uuid';

export const postFiles = (req, res) => {
  //Store file

  let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

  let upload = multer({
    storage,
    limit: { fileSize: 1000000 * 100 },
  }).single('myfile');

  upload(req, res, async (err) => {
    //Validate request

    if (!req.file) {
      console.log(req);
      return res.json({ error: 'All Fields are required.' });
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //Store into Database
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
};
