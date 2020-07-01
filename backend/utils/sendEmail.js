const nodemailer = require('nodemailer');


const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 25,
    auth: {
      user: '069843ef68956e',
      pass: 'e1c5285c51b677'
    }
  });

  const mailOptions = {
    from: 'FindMe <marko@abv.bg>',
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
}

module.exports = sendEmail;
