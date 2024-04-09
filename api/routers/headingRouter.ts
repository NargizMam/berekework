import express from 'express';
import Heading from '../models/heading/headingModels';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const headingRouter = express.Router();

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

headingRouter.get('/:location', async (req, res, next) => {
  try {
    let results;
    if (req.params.location) {
      results = await Heading.findOne({ location: req.params.location });
    } else {
      results = await Heading.find();
    }
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

headingRouter.patch('/:location', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const result = await Heading.updateOne({
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
      button: JSON.parse(req.body.button),
    });
    return res.send({ message: `Update ${req.params.location} successfully.`, result });
  } catch (error) {
    return next(error);
  }
});

export default headingRouter;
