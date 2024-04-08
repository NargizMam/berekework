import express from 'express';
import Heading from '../models/heading/headingModels';
import { imagesUpload } from '../multer';

const headingRouter = express.Router();

headingRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const heading = new Heading({
      title: req.body.title,
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
    return next(error);
  }
});

headingRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Heading.findOne();
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

headingRouter.patch('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const result = await Heading.updateOne({
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
      button: JSON.parse(req.body.button),
    });
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

export default headingRouter;
