import express from 'express';
import Footer from '../models/footer/Footer';

const footerRouter = express.Router();

footerRouter.post('/', async (req, res, next) => {
  try {
    const { footerLinks, socialNetworks, contactDetails, logo, copyright } = req.body;

    let existingFooter = await Footer.findOne();

    if (existingFooter) {
      await Footer.findByIdAndDelete(existingFooter._id);
    }

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

footerRouter.post('/new-links', async (req, res, next) => {
  try {
    const existingFooters = await Footer.find();

    const totalFooterLinks = existingFooters.reduce((total, footer) => total + footer.footerLinks.length, 0);

    if (totalFooterLinks >= 5) {
      return res.status(400).send("Cannot add more than 5 footer links");
    }

    const { title, links } = req.body;

    const existingFooter = existingFooters[0];

    if (!existingFooter) {
      const newFooter = new Footer({
        footerLinks: [{ title, links }],
      });

      await newFooter.save();
      return res.send(newFooter);
    }

    existingFooter.footerLinks.push({ title, links });
    await existingFooter.save();

    return res.send(existingFooter);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

footerRouter.delete('/footerLinks/:linkId', async (req, res, next) => {
  try {
    const { linkId } = req.params;

    const existingFooter = await Footer.findById(linkId);

    if (!existingFooter) {
      return res.status(404).send("Footer not found");
    }

    const linkIndex = existingFooter.footerLinks.findIndex(link => link._id && link._id.toString() === linkId);

    if (linkIndex === -1) {
      return res.status(404).send("Footer link not found");
    }

    existingFooter.footerLinks.splice(linkIndex, 1);

    await existingFooter.save();

    return res.send("Footer link deleted successfully");
  } catch (error) {
    console.error('Error deleting footer link:', error);
    next(error);
  }
});



export default footerRouter;