import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import config from './config';
import { promises as fs } from 'fs';

const createStorageConfig = (subFolder: string) =>
  multer.diskStorage({
    destination: async (_req, _file, cb) => {
      const destDir = path.join(config.publicPath, subFolder);
      await fs.mkdir(destDir, { recursive: true });
      cb(null, destDir);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname);
      const filename = path.join(randomUUID() + extension);
      cb(null, filename);
    },
  });

export const imagesUpload = multer({ storage: createStorageConfig('images') });

export const avatarsUpload = multer({ storage: createStorageConfig('avatars') });
