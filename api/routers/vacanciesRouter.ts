import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import { cardUpload } from '../multer';
import Vacancy from '../models/Vacancy';
import { VacancyMutation } from '../types';

const vacanciesRouter = express.Router();
vacanciesRouter.post('/', cardUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, companyName, city} = req.body;
  let salary: string | number = req.body.salary ? parseFloat(req.body.salary) : 'з/п не указана';
  let logo: string | null = null;

  const files = req.files as Express.Multer.File[];

  files.forEach((file) => {
    logo = file.fieldname === 'image' ? file.filename : logo;
  });

  try {
    const newVacancy: VacancyMutation= {
      title: title,
      description: description,
      companyLogo: logo,
      companyName: companyName,
      city: city,
      salary: salary,
    };

    const vacancy = new Vacancy(newVacancy);
    await vacancy.save();

    return res.send(vacancy);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

export default vacanciesRouter;