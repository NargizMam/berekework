import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  port: 587,
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: 'bereke.work@gmail.com',
    pass: 'fttk qskh uicy zmsr',
  },
});
