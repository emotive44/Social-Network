const nodemailer = require('nodemailer');


module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'FindMe <marko@abv.bg>';
  }

  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 25,
      auth: {
        user: '069843ef68956e',
        pass: 'e1c5285c51b677'
      }
    });
  }

  async send(template, subject) {
    const mailOptions = {
      subject,
      to: this.to,
      html: template,
      from: this.from,
    }

    try {
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.error(err);
    }
  }

  async sendWelcome() {
    const template = `
    <h1>Hello, ${this.firstName}.</h1>
    <p>Welcome to FindMe Group!</p>
    <a href=${this.url} target='_blank'>Go to login</a>
    <p>If you need any help or problems, please don't hesitate to contact me!</p>
    <p>Marko Streleshki, CEO.</p>`;

    await this.send(template, 'Welcome to FindMe!');
  }

  async sendResetPassword() {
    const template = `
    <h1>Hi, ${this.firstName}.</h1>
    <p>Forgot your password? Submit a PATCH request with your new password to: ${this.url}</p>
    <a href=${this.url} target='_blank'>Reset Your Password</a>
    <p>If you didn't forget your password, please ignore this email!</p>
    `;

    await this.send(template, 'Your reset password token is valid only for 10 minutes.');
  }
}