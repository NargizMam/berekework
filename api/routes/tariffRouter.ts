import { Router } from 'express';
import Tariff from '../models/tariff/tarrifModel';
import mongoose from 'mongoose';

const tariffRouter = Router();

tariffRouter.post('/', async (req, res, next) => {
  try {
    const { title, description, mainTitle } = req.body;
    const tariff = new Tariff({
      title,
      description,
      mainTitle,
    });

    await tariff.save();
    return res.send({ message: 'Tariff created!' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    return next(error);
  }
});

tariffRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Tariff.find();
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

tariffRouter.get('/:id', async (req, res, next) => {
  try {
    const results = await Tariff.findById(req.params.id);
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

tariffRouter.patch('/:id', async (req, res, next) => {
  try {
    const { title, description, mainTitle } = req.body;
    const result = await Tariff.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        description,
        mainTitle,
      },
      { new: true },
    );
    return res.send({ message: `Update ${req.params.id} successfully.`, result });
  } catch (error) {
    return next(error);
  }
});

tariffRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Tariff.findByIdAndDelete(id);
    return res.send({ message: `Tariff ${id} deleted!` });
  } catch (error) {
    return next(error);
  }
});

export default tariffRouter;
