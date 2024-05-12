import e, { NextFunction, Request, Response, Router } from "express";
import GalleryVideo from "../models/GalleryVideoModel";
import { imagesUpload, videosUpload } from "../multer";
import mongoose from "mongoose";
import path from "path";
import * as fs from 'fs';

const galleryVideoRouter = Router();

galleryVideoRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const picturesData = await GalleryVideo.find({picture: { $exists: true }});
    const videosData = await GalleryVideo.find({video: { $exists: true }});

    return res.send({gallery: picturesData, videos: videosData});
  } catch (error) {
    next(error);
  }
});

// creating picture in gallery block
galleryVideoRouter.post('/new-picture', imagesUpload.single('picture'),
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
galleryVideoRouter.put('/new-picture/:id', imagesUpload.single('picture'),
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

      const oldPicturePath = path.join(__dirname, '../public', 'images', updatedPicture.picture ? 
      updatedPicture.picture : '');


      updatedPicture.picture = picture.filename;
      updatedPicture.name = picture.originalname.toString();

      await updatedPicture.save();

      fs.unlink(oldPicturePath, (err) => {
        if (err) {
          console.error(`Failed to delete old picture: ${err.message}`);
        }
      });

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
galleryVideoRouter.delete('/new-picture/:id', async (req: Request, res: Response, next: NextFunction) => {
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

galleryVideoRouter.post('/new-video', videosUpload.single('video'),
  async (req: Request, res: Response, next: NextFunction) => {
    const video = req.file;

    if (!video) {
      return res.status(404).send({ error: 'video you have just sended not found' });
    }

    try {
      const videoData = new GalleryVideo({
        name: video.originalname.toString(),
        video: video.filename,
      });

      const newVideo = await videoData.save();

      return res.send({ message: 'Success', newVideo });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(error);
    }
  },
);

galleryVideoRouter.put('/new-video/:id', videosUpload.single('video'),
  async (req: Request, res: Response, next: NextFunction) => {
    const video = req.file;
    const itemId = req.params.id;

    if (!video) {
      return res.status(404).send({ error: 'Video you have just sended not found' });
    }

    try {
      const updatedVideo = await GalleryVideo.findById(itemId);

      if (!updatedVideo) {
        return res.status(404).send({ error: 'item not found' });
      }

      const oldVideoPath = path.join(__dirname, '../public', 'videos', updatedVideo.video ? updatedVideo.video : '');

      updatedVideo.video = video.filename;
      updatedVideo.name = video.originalname.toString();

      await updatedVideo.save();

      fs.unlink(oldVideoPath, (err) => {
        if (err) {
          console.error(`Failed to delete old video: ${err.message}`);
        }
      });

      return res.send({ message: 'Updated', updatedVideo});
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

galleryVideoRouter.delete('/new-video/:id', async (req: Request, res: Response, next: NextFunction) => {
  const itemId = req.params.id;

  try {
    const deletedVideo = await GalleryVideo.findByIdAndDelete(itemId);

    return res.send({
      message: 'Deleted',
      deletedVideo,
    });
  } catch (error) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Invalid ID' });
    }

    next(error);
  }
});

export default galleryVideoRouter;
