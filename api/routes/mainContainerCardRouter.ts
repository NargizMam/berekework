import { Router, Request, Response, NextFunction } from "express";
import mainContainerCard from "../models/mainContainerCard/mainContainerCardModel";
import { cardUpload } from "../multer";
import { mainCardContainerTypeWithoutId } from "../types";
import mongoose from "mongoose";

const mainContainerCardRouter = Router();

mainContainerCardRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await mainContainerCard.find(); // List of Cards

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

mainContainerCardRouter.post('/', cardUpload.any(),
async (req:Request, res: Response, next: NextFunction) => {
  const { title, text, URLpath } = req.body;
  let cardImage: string | null = null;
  let cardIcon: string | null = null;

  const files = req.files as Express.Multer.File[];

  files.forEach((file) => {
    cardImage = file.fieldname === 'image' ? file.filename : cardImage; // getting image from req.files array
    cardIcon = file.fieldname === 'icon' ? file.filename : cardIcon; // getting icon from req.files array
  });

  try {
    const newCardContainer: mainCardContainerTypeWithoutId = {
      title: title,
      text: text,
      image: cardImage,
      icon: cardIcon,
      URLpath: URLpath,
    };

    const cardContainer = new mainContainerCard( newCardContainer );
    await cardContainer.save();

    return res.send( newCardContainer );
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

mainContainerCardRouter.put('/:id', cardUpload.any(), 
async (req: Request, res: Response, next: NextFunction) => {
  const { title, text, URLpath } = req.body;
  let cardImage: string | null = null;
  let cardIcon: string | null = null;

  const files = req.files as Express.Multer.File[];

  files.forEach((file) => {
    cardImage = file.fieldname === 'image' ? file.filename : cardImage; // getting image from req.files array
    cardIcon = file.fieldname === 'icon' ? file.filename : cardIcon; // getting icon from req.files array
  });

  try {
    const cardID = req.params.id;

    const existedCard = await mainContainerCard.findById( cardID );

    if (!existedCard) {
      return res.status(404).send({ error: 'Card not found' });
    };

    Object.assign(existedCard, { 
      title, 
      text, 
      URLpath, 
      image: cardImage, 
      icon: cardIcon 
    }); // changing all fields of card

    await existedCard.save();

    return res.send({ 
      message: 'card has been changed', existedCard 
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Invalid ID' });
    }

    next(e);
  }
});

mainContainerCardRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cardID = req.params.id;

    const result = await mainContainerCard.findByIdAndDelete( cardID );

    if (!result) {
      return res.status(404).send({ 
        message: 'Card not found or already deleted' 
      });
    }

    return res.send({ message: 'success', result });
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Invalid ID' });
    }

    next(e);
  }
});

export default mainContainerCardRouter;
