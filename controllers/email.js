import nodemailer from 'nodemailer';
import File from '../Models/File.js';
import { emailTemplate } from '../services/emailTemplate.js';

const sendMail = async ({ from, to, subject, text, html }) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    post: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `RkShare <${from}>`,
    to,
    subject,
    text,
    html,
  });
};

export const sendEmail = async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  if (!uuid || !emailTo || !emailFrom) {
    return res.status(422).send('All fields are required');
  }

  const file = await File.findOne({ uuid: uuid });

  if (file.sender) {
    return res.status(422).send('Email already sent');
  }

  file.sender = emailFrom;
  file.receiver = emailTo;

  const response = await file.save();

  sendMail({
    from: emailFrom,
    to: emailTo,
    subject: 'RkShare file sharing',
    text: `${emailFrom} shared a file with you.`,
    html: emailTemplate({
      emailFrom: emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/api/files/${response.uuid}`,
      size: parseInt(file.size / 1000) + 'KB',
      expires: '24 Hours',
    }),
  });

  return res.status(200).send({ success: true });
};
