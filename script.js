import File from './Models/File.js';
import fs from 'fs';
import connectDB from './config/db.js';

connectDB();
const deleteData = async () => {
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastDate } });
  if (files.length) {
    for (const file of files) {
      try {
        // fs.unlinkSync(file.path);
        await file.remove();
        console.log(`Successfully deleted ${file.filename}`);
      } catch (error) {
        // console.log(file.path);
        console.log(`Error while deleting file ${error}`);
      }
    }
    console.log('Job Done!');
  }
};
console.log('running');

deleteData().then(process.exit);
