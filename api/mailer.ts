import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '04072002mu@gmail.com',
    pass: '2107mika',
  },
  secure: true,
});

const mailOptions = {
  from: '04072002mu@gmail.com',
  to: 'muradilakk02@gmail.com',
  subject: 'Hello my friend!',
  text: 'Text of letter',
};

transporter.sendMail(mailOptions, (err) => {
  console.log(err);
});
