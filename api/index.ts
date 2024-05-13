import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';

import mainContainerCardRouter from './routes/mainContainerCardRouter';
import headingRouter from './routes/headingRouter';
import headerRouter from './routes/headerRouter';
import galleryVideoRouter from './routes/galleryVideoRouter';
import userRouter from './routes/userRouter';
import vacancyRouter from './routes/vacancyRouter';
import vacanciesBlockRouter from './routes/vacanciesBlockRouter';
import tariffRouter from './routes/tariffRouter';
import lastNewsBlockRouter from './routes/lastNewsBlock';
import pageCreateRouter from './routes/pageCreateRouter';
import employerRouter from './routes/employerRouter';
import applicationsRouter from './routes/applicationsRouter';
import applicantRouter from "./routes/applicantRouter";
import imageUploadRouter from "./routes/imageUploadRouter";
import employeesCardRouter from './routes/employeesCardRouter';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/employer', employerRouter);
app.use('/mainContainerCard', mainContainerCardRouter);
app.use('/header', headerRouter);
app.use('/gallery-video', galleryVideoRouter);
app.use('/heading', headingRouter);
app.use('/vacancy', vacancyRouter);
app.use('/vacanciesBlock', vacanciesBlockRouter);
app.use('/tariff', tariffRouter);
app.use('/last-news-block', lastNewsBlockRouter);
app.use('/page', pageCreateRouter);
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
