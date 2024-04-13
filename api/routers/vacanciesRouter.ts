import mongoose, { Types } from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import { cardUpload } from '../multer';
import Vacancy from '../models/Vacancy';
import { VacancyMutation } from '../types';

const vacanciesRouter = express.Router();
vacanciesRouter.post('/', cardUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, company, city, salary } = req.body;
  let companyLogo: string | null = null;

  const files = req.files as Express.Multer.File[];

  files.forEach((file) => {
    companyLogo = file.fieldname === 'logo' ? file.filename : companyLogo;
  });

  try {
    const newVacancy: VacancyMutation = {
      title,
      description,
      logo: companyLogo,
      company: company,
      city,
      salary: {
        min: salary.min ? parseFloat(salary.min) : null,
        max: salary.max ? parseFloat(salary.max) : null,
      },
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

vacanciesRouter.patch('/:id', cardUpload.any(), async (req, res, next) => {
  const { title, description, company, city, salary } = req.body;
  let companyLogo: string | null = null;

  const files = req.files as Express.Multer.File[];

  files.forEach((file) => {
    companyLogo = file.fieldname === 'logo' ? file.filename : companyLogo;
  });

  try {
    const _id = req.params.id;

    const existedVacancy = await Vacancy.findById(_id);

    if (!existedVacancy) {
      return res.status(404).send({ error: 'Vacancy not found' });
    }

    Object.assign(existedVacancy, {
      title,
      description,
      logo: companyLogo,
      company,
      city,
      min: salary.min ? parseFloat(salary.min) : null,
      max: salary.max ? parseFloat(salary.max) : null,
    });

    await existedVacancy.save();

    return res.send({
      message: 'Vacancy has been changed',
      existedVacancy,
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

vacanciesRouter.delete('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const result = await Vacancy.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).send({
        error: 'Vacancy not found or already deleted',
      });
    }

    return res.send({ message: 'success', result });
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ error: 'Invalid ID' });
    }

    next(e);
  }
});

export default vacanciesRouter;