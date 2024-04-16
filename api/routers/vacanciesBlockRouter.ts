import mongoose, { Types } from 'mongoose';
import express from 'express';
import VacanciesBlock from '../models/VacanciesBlock';
import { VacanciesBlockMutation } from '../types';

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

vacanciesBlockRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const vacanciesBlock = await VacanciesBlock.findById(_id);

    if (!vacanciesBlock) {
      return res.status(404).send({ error: 'Vacancies block not found!' });
    }

    res.send(vacanciesBlock);
  } catch (e) {
    next(e);
  }
});

vacanciesBlockRouter.patch('/:id', async (req, res, next) => {
  const { title, cards, button, location } = req.body;

  try {
    const _id = req.params.id;

    const existedVacanciesBlock = await VacanciesBlock.findById(_id);

    if (!existedVacanciesBlock) {
      return res.status(404).send({ error: 'Vacancies block not found' });
    }

    Object.assign(existedVacanciesBlock, {
      title,
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

vacanciesBlockRouter.delete('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const result = await VacanciesBlock.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).send({
        error: 'Vacancies block not found or already deleted',
      });
    }

    return res.send({ message: 'success', result });
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ error: 'Invalid ID' });
    }

    next(e);
  }
});

export default vacanciesBlockRouter;
