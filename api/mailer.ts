import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env['USER_MAILER'],
    pass: process.env['USER_MAILER_PASSWORD'],
  },
});
