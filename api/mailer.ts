import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: '04072002mu@gmail.com',
    pass: 'zrslivmlllbgcsmw',
  },
});

// const mailOptions = {
//   from: '04072002mu@gmail.com',
//   to: 'muradilakk02@gmail.com',
//   subject: 'Hello my friend!',
//   text: 'Text of letter',
// };
//
// transporter.sendMail(mailOptions, (err) => {
//   console.log(err);
// });
