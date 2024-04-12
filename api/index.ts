import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import vacanciesRouter from './routers/vacanciesRouter';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/vacancies', vacanciesRouter);

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
