import express from 'express';
import NavbarItem from '../models/header/NavbarItem';
import Header from '../models/header/Header';
import mongoose from 'mongoose';
import { NavbarItemFields } from '../types';
import { logosUpload} from '../multer';

const headerRouter = express.Router();

headerRouter.post('/', logosUpload.single('logo'), async (req, res, next) => {
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

headerRouter.get('/', async (req, res, next) => {
  try {
    let headerData;
    if(req.query){
      headerData = await Header.findOne().select('logo name');
      return res.send(headerData)
    }
    headerData = await Header.findOne().populate('navbarItems');
    return res.send(headerData);
  } catch (e) {
    next(e);
  }
});

export default headerRouter;
