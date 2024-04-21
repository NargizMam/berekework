import e, { NextFunction, Request, Response, Router } from "express";
import GalleryVideo from "../models/GalleryVideoModel";
import { imagesUpload } from "../multer";
import { GalleryVideoType } from "../types";
import mongoose from "mongoose";

const galleryVideoRouter = Router();

galleryVideoRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await GalleryVideo.find();

    return res.send(results);
  } catch (error) {
    next(error);
  }
});

// creating picture in gallery block
galleryVideoRouter.post('/new-picture-gallery', imagesUpload.single('picture'),
  async (req: Request, res: Response, next: NextFunction) => {
    const picture = req.file;

    if (!picture) {
      return res.status(404).send({ error: 'picture you have just sended not found' });
    }

    try {
      const pictureData = new GalleryVideo({
        name: picture.originalname.toString(),
        picture: picture.filename,
      });

      const newPicture = await pictureData.save();

      return res.send({ message: 'Success', newPicture });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(error);
    }
  },
);

// updating picture in gallery block
galleryVideoRouter.put('/new-picture-gallery/:id', imagesUpload.single('picture'),
  async (req: Request, res: Response, next: NextFunction) => {
    const picture = req.file;
    const itemId = req.params.id;

    if (!picture) {
      return res.status(404).send({ error: 'picture you have just sended not found' });
    }

    try {
      const updatedPicture = await GalleryVideo.findById(itemId);

      if (!updatedPicture) {
        return res.status(404).send({error: 'item not found'});
      }

      updatedPicture.picture = picture.filename;
      updatedPicture.name = picture.originalname.toString();

      await updatedPicture.save();

      return res.send({ message: 'Updated', updatedPicture });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      if (e instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Invalid ID' });
      }

      next(error);
    }
  },
);

// Deleting picture in gallery block
galleryVideoRouter.delete('/new-picture-gallery/:id', async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.params.id;

    try {
      const deletedPicture = await GalleryVideo.findByIdAndDelete(itemId);

      return res.send({ 
        message: 'Deleted', deletedPicture 
      });
    } catch (error) {
      if (e instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Invalid ID' });
      }

      next(error);
    }
  },
);

export default galleryVideoRouter;
