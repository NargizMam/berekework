import express from 'express';
import Footer from '../models/footer/Footer';

const footerRouter = express.Router();

footerRouter.post('/', async (req, res, next) => {
  try {
    const { footerLinks, socialNetworks, contactDetails, logo, copyright } = req.body;

    const newFooter = new Footer({ footerLinks, logo, socialNetworks, contactDetails, copyright });

    await newFooter.save();
    return res.send(newFooter);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

footerRouter.get('/', async (_req, res) => {
  try {
    const result = await Footer.find();
    return res.send(result);

  } catch (error) {
    return res.sendStatus(500);
  }
});

export default footerRouter;