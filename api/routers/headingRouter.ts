import express from 'express';
import Heading from '../models/heading/headingModels';
import { imagesUpload } from '../multer';

const headingRouter = express.Router();

headingRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const heading = new Heading({
      title: req.body.title,
      url: req.body.url,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
    });
    await heading.save();
    return res.send(heading);
  } catch (error) {
    return next(error);
  }
});

headingRouter.get('/', async (req, res, next) => {
  try {
    const results = await Heading.findOne();
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

export default headingRouter;
