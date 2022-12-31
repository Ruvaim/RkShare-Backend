import File from '../Models/File.js';
import path from 'path';

export const downloadFile = async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });
  if (!file) {
    res.status(500).json({ message: 'Downloading fails' });
  }
  const __dirname = path.resolve();

  const filePath = `${__dirname}/${file.path}`;

  res.download(filePath);
  res.status(200);
};
