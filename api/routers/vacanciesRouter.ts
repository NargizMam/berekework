import mongoose, { Types } from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import { cardUpload } from '../multer';
import Vacancy from '../models/Vacancy';
import { VacancyMutation } from '../types';

const vacanciesRouter = express.Router();
vacanciesRouter.post('/', cardUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, companyName, city, salaryMin, salaryMax } = req.body;
  let companyLogo: string | null = null;

  const files = req.files as Express.Multer.File[];

  files.forEach((file) => {
    companyLogo = file.fieldname === 'companyLogo' ? file.filename : companyLogo;
  });

  try {
    const newVacancy: VacancyMutation = {
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

vacanciesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Vacancy.find();

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

vacanciesRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const vacancy = await Vacancy.findById(_id);

    if (!vacancy) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(vacancy);
  } catch (e) {
    next(e);
  }
});







export default vacanciesRouter;