import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import * as express from 'express';
import ChooseSpecialistBlock from "../models/specialistBlock/ChooseSpecialistBlock";

const ChooseBlockRouter = express.Router();

ChooseBlockRouter.get('/', async (_req, res) => {
  try {
    const block = await ChooseSpecialistBlock.findOne();
    res.json(block);
  } catch (err) {
    return res.status(500).send(err);
  }
});

ChooseBlockRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const existingBlock = await ChooseSpecialistBlock.findOne();
    if (existingBlock) {
      existingBlock.title = req.body.title;
      existingBlock.link = req.body.link;
      existingBlock.url = req.body.url;
      existingBlock.image = req.file ? 'images/' + req.file.filename : null;
      await existingBlock.save();
      return res.send(existingBlock);
    } else {
      const chooseBlock = new ChooseSpecialistBlock({
        title: req.body.title,
        link: req.body.link,
        url: req.body.url,
        image: req.file ? 'images/' + req.file.filename : null,
      });
      await chooseBlock.save();
      return res.send(chooseBlock);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default ChooseBlockRouter;
