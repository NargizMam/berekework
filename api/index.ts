import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import mainContainerCardRouter from './routers/mainContainerCardRouter';
import headingRouter from './routes/headingRouter';
import headerRouter from './routes/headerRouter';
import ChooseBlockRouter from "./routers/chooseSpecialistBlock";

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/mainContainerCard', mainContainerCardRouter);
app.use('/header', headerRouter);
app.use('/heading', headingRouter);
app.use('/chooseBlock', ChooseBlockRouter);

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
