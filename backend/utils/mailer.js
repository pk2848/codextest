const nodemailer = require('nodemailer');
const env = require('../config/env');

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  auth: { user: env.smtp.user, pass: env.smtp.pass }
});

async function sendPasswordResetEmail(to, token) {
  const resetLink = `${env.appUrl}/auth/reset-password?token=${token}`;
  return transporter.sendMail({
    from: 'no-reply@smartschoolerp.com',
    to,
    subject: 'Reset your SmartSchool ERP password',
    html: `<p>Click to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
  });
}

module.exports = { sendPasswordResetEmail };
