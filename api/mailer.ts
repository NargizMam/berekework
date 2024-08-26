import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  port: 587,
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env['USER_MAILER'],
    pass: process.env['USER_MAILER_PASSWORD'],
  },
});
