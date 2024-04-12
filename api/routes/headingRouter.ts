import express from 'express';
import Heading from '../models/heading/headingModels';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const headingRouter = express.Router();

headingRouter.post('/draft', async (req, res, next) => {
  const heading = new Heading();
  await heading.save();
  return res.send(heading);
});

headingRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const heading = new Heading({
      title: req.body.title,
      location: req.body.location,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
      button: {
        url: req.body.url,
        text: req.body.text,
      },
    });
    await heading.save();
    return res.send(heading);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error.message);
    }
    return next(error);
  }
});

headingRouter.get('/:location?', async (req, res, next) => {
  try {
    let results;
    if (req.params.location) {
      results = await Heading.findOne({ location: req.params.location });
      if (!results) {
        return res.status(404).send({ message: 'Heading not found' });
      }
    } else {
      results = await Heading.find();
    }
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

headingRouter.patch('/:id', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const result = await Heading.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        image: req.file ? req.file.filename : null,
        location: req.body.location,
        description: req.body.description,
        button: req.body.button ? JSON.parse(req.body.button) : undefined,
      },
    );
    return res.send({ message: `Update ${req.params.id} successfully.`, result });
  } catch (error) {
    return next(error);
  }
});

headingRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Heading.findByIdAndDelete(id);
    return res.send({ message: `Heading ${id} deleted!` });
  } catch (error) {
    return next(error);
  }
});

export default headingRouter;
