import { Router, Request, Response, NextFunction } from 'express';
import employeesCard from '../models/employeesCard/employeesCardModel';
import { employeesUpload } from '../multer';
import { EmployeesDataType } from '../types';
import mongoose from 'mongoose';
import path from 'path';
import * as fs from 'fs';

const employeesCardRouter = Router();

employeesCardRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await employeesCard.find();

    return res.send(results);
  } catch (error) {
    next(error);
  }
});

employeesCardRouter.post('/', employeesUpload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    const employeePhoto = req.file;
    const { name, profession, age, country, city, education, experience } = req.body;

    try {
      const employeeData: EmployeesDataType = {
        name: name,
        photo: employeePhoto?.filename,
        profession: profession,
        age: age,
        country: country,
        city: city,
        education: education,
        experience: experience,
      };

      const employee = new employeesCard(employeeData);
      await employee.save();

      return res.send({ message: 'created', employee });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }

      next(error);
    }
  },
);

employeesCardRouter.put('/:id', employeesUpload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    const employeePhoto = req.file ? req.file.filename : null;
    const { name, profession, age, country, city, education, experience } = req.body;

    try {
      const cardID = req.params.id;
      const existedCard = await employeesCard.findById( cardID );
      
      if (!existedCard) {
        return res.status(404).send({ error: 'Card not found' });
      }

      const oldPhotoPath = path.join(__dirname, '../public', existedCard.photo ? 
      existedCard.photo : '');

      Object.assign(existedCard, {
        name,
        profession,
        age,
        country,
        city,
        education,
        experience
      });
      existedCard.photo = employeePhoto;

      await existedCard.save();

      fs.unlink(oldPhotoPath, (err) => {
        if (err) {
          console.error(`Failed to delete old picture: ${err.message}`);
        }
      });

      return res.send({ message: 'employee has been changed', existedCard });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }

      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Invalid ID' });
      }

      next(error);
    }
  },
);

employeesCardRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardID = req.params.id;
      const deletedCard = await employeesCard.findByIdAndDelete(cardID);

      if (!deletedCard) {
        return res.status(404).send({ error: 'Card not found' });
      }

      const oldPhotoPath = path.join(__dirname, '../public', deletedCard.photo ? 
      deletedCard.photo : '');

      fs.unlink(oldPhotoPath, (err) => {
        if (err) {
          console.error(`Failed to delete old picture: ${err.message}`);
        }
      });

      return res.send({ 
        message: 'employee has been deleted', 
        deletedCard 
      });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }

      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Invalid ID' });
      }

      next(error);
    }
  },
);

export default employeesCardRouter;
