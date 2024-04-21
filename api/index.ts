import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';
import mainContainerCardRouter from './routes/mainContainerCardRouter';
import headingRouter from './routes/headingRouter';
import headerRouter from './routes/headerRouter';
import userRouter from './routes/userRouter';
import vacanciesRouter from './routes/vacanciesRouter';
import vacanciesBlockRouter from './routes/vacanciesBlockRouter';
import tariffRouter from './routes/tariffRouter';
import lastNewsBlockRouter from "./routes/lastNewsBlock";

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/mainContainerCard', mainContainerCardRouter);
app.use('/header', headerRouter);
app.use('/heading', headingRouter);
app.use('/vacancies', vacanciesRouter);
app.use('/vacanciesBlock', vacanciesBlockRouter);
app.use('/tariff', tariffRouter);
app.use('/last-news-block', lastNewsBlockRouter);


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
