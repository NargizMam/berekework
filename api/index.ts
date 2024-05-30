import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';

import userRouter from './routes/userRouter';
import vacancyRouter from './routes/vacancyRouter';
import employerRouter from './routes/employerRouter';
import applicationsRouter from './routes/applicationsRouter';
import applicantRouter from './routes/applicantRouter';
import imageUploadRouter from './routes/imageUploadRouter';
import employeesCardRouter from './routes/employeesCardRouter';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/employer', employerRouter);
app.use('/vacancy', vacancyRouter);
app.use('/upload-image', imageUploadRouter);
app.use('/applications', applicationsRouter);
app.use('/applicants', applicantRouter);
app.use('/employees-card', employeesCardRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
