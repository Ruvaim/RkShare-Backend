import File from '../Models/File.js';

export const showLink = async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.render('download', { error: 'Link has been expired' });
    }
    // return res.render('download', {
    //   uuid: file.uuid,
    //   fileName: file.filename,
    //   fileSize: file.size,
    //   download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    // });
    return res.status(200).json({
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      download: `${process.env.APP_BASE_URL}/api/files/download/${file.uuid}`,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
