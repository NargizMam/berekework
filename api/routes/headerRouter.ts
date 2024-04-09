import express from 'express';
import NavbarItem from '../models/NavbarItem';
import Header from '../models/Header';
import mongoose from 'mongoose';
import { NavbarItemFields } from '../types';
import { imagesUpload } from '../multer';

const headerRouter = express.Router();

headerRouter.post('/', imagesUpload.single('logo'), async (req, res, next) => {
  try {
    await Header.deleteMany({});
    await NavbarItem.deleteMany({});

    const navbarItemsData: NavbarItemFields[] = JSON.parse(req.body.navbarItems);

    if (navbarItemsData.length > 6) {
      return res.status(422).send('NavbarItem can not be more than 6!');
    }

    const savedNavbarItems = await Promise.all(
      navbarItemsData.map(async (item) => {
        const navbarItem = new NavbarItem({
          nameNav: item.nameNav,
          link: item.link,
          isDrop: item.isDrop,
          nestedMenu: item.nestedMenu,
        });

        return navbarItem.save();
      }),
    );

    const headerData = new Header({
      logo: req.file && req.file.filename,
      name: req.body.name,
      url: req.body.url,
      navbarItems: savedNavbarItems.map((item) => item._id),
    });

    const savedHeader = await headerData.save();

    return res.send(savedHeader);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    if ((e as any).code === 11000) {
      return res.status(422).send('Navbar duplicated');
    }

    next(e);
  }
});

headerRouter.get('/', async (_req, res, next) => {
  try {
    const headerData = await Header.findOne().populate('navbarItems');
    return res.send(headerData);
  } catch (e) {
    next(e);
  }
});

export default headerRouter;
