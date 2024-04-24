import mongoose from 'mongoose';
import express from 'express';
import VacanciesBlock from '../models/vacancy/VacanciesBlock';
import {VacanciesBlockMutation} from '../types';

const vacanciesBlockRouter = express.Router();

vacanciesBlockRouter.post('/', async (req, res, next) => {
  await VacanciesBlock.deleteMany({});
  const { title, button, location } = req.body;

  try {
    const newVacanciesBlock: VacanciesBlockMutation = {
      title,
      button: {
        text: button.text,
        url: button.url,
      },
      location,
    };

    const vacancyBlock = new VacanciesBlock(newVacanciesBlock);
    await vacancyBlock.save();

    return res.send(vacancyBlock);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

vacanciesBlockRouter.get('/', async (req, res, next) => {
  try {
    const result = await VacanciesBlock.find();

    return res.send(result);
  } catch (e) {
    next(e);
  }
});

export default vacanciesBlockRouter;
