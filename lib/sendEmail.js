const nodemailer = require('nodemailer');

module.exports = async ({ to, subject, text, attachments }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_APP_PWD
    }
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    text,
    attachments
  };

  await transporter.sendMail(mailOptions);
};