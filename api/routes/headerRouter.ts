import express from 'express';
import NavbarItem from '../models/header/NavbarItem';
import Header from '../models/header/Header';
import mongoose from 'mongoose';
import { NavbarItemFields } from '../types';
import { logosUpload } from '../multer';

const headerRouter = express.Router();

headerRouter.post('/', logosUpload.single('logo'), async (req, res, next) => {
  try {
    await NavbarItem.deleteMany({});
    await Header.deleteMany({});

    let image: string | undefined | null = undefined;

    if (typeof req.body.logo === 'string') {
      image = req.body.logo;
    } else if (req.file) {
      image = req.file.filename;
    }

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
            access: item.access,
            nestedMenu: item.nestedMenu,
          });

          return navbarItem.save();
        }),
    );

    const headerData = new Header({
      logo: image,
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
    next(e);
  }
});

headerRouter.get('/', async (_req, res, next) => {
  try {
    const headerData = await Header.findOne().select('-__v').populate('navbarItems', '-__v');
    return res.send(headerData);
  } catch (e) {
    next(e);
  }
});

export default headerRouter;