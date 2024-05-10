import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import config from './config';
import { promises as fs } from 'fs';

const createStorageConfig = (subFolder: string) =>
  multer.diskStorage({
    destination: async (_req, file, cb) => {
      const destDir = path.join(config.publicPath, subFolder);
      await fs.mkdir(destDir, { recursive: true });
      cb(null, config.publicPath);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname);
      const filename = path.join(subFolder, randomUUID() + extension);
      cb(null, filename);
    },
  });

export const imagesUpload = multer({ storage: createStorageConfig('images') });
export const videosUpload = multer({ storage: createStorageConfig('videos') });

export const cardUpload = multer({ storage: createStorageConfig('cards') });
export const avatarsUpload = multer({ storage: createStorageConfig('avatars') });
export const logosUpload = multer({ storage: createStorageConfig('logos') });
export const multiUpload = multer({ storage: createStorageConfig('documents') });
