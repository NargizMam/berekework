import mongoose from 'mongoose';
import express from 'express';
import { cardUpload } from '../multer';
import VacanciesBlock from '../models/VacanciesBlock';
import Vacancy from '../models/Vacancy';
import { VacanciesBlockMutation } from '../types';

const vacanciesBlockRouter = express.Router();
vacanciesBlockRouter.post('/', async (req, res, next) => {
  const { title, cards, button, location } = req.body;

  try {
    const newVacanciesBlock: VacanciesBlockMutation = {
      title,
      cards,
      button,
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

vacanciesBlockRouter.patch('/:id', cardUpload.any(), async (req, res, next) => {
  const { title, cards, button, location } = req.body;

  try {
    const _id = req.params.id;

    const existedVacanciesBlock = await VacanciesBlock.findById(_id);

    if (!existedVacanciesBlock) {
      return res.status(404).send({ error: 'VacanciesBlock not found' });
    }

    Object.assign(existedVacanciesBlock, {
      title,
      cards,
      button,
      location,
    });

    await existedVacanciesBlock.save();

    return res.send({
      message: 'VacanciesBlock has been changed',
      existedVacanciesBlock,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Invalid ID' });
    }

    next(e);
  }
});