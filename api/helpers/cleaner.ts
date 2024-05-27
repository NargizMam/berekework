import path from "path";
import * as fs from 'fs';

export const FileCleaner = (oldFile: string) => {
  const pictureRoot = path.join(__dirname, '../public', oldFile ? oldFile : '');
  
  fs.unlink(pictureRoot, (err) => {
    if (err) {
      console.error(`Failed to delete old picture: ${err.message}`);
    }
  });
};