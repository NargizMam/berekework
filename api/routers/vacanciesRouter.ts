import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import { cardUpload } from '../multer';
import Vacancy from '../models/Vacancy';
import { VacancyMutation } from '../types';

const vacanciesRouter = express.Router();
vacanciesRouter.post('/', cardUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, companyName, city, salaryMin, salaryMax} = req.body;
  let companyLogo: string | null = null;

  const files = req.files as Express.Multer.File[];

  files.forEach((file) => {
    companyLogo = file.fieldname === 'companyLogo' ? file.filename : companyLogo;
  });

  try {
    const newVacancy: VacancyMutation= {
      title: title,
      description: description,
      companyLogo: companyLogo,
      companyName: companyName,
      city: city,
      salaryMin: salaryMin ? parseFloat(salaryMin) : null,
      salaryMax: salaryMax ? parseFloat(salaryMax) : null,
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