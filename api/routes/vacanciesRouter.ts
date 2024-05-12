import mongoose, {Types} from 'mongoose';
import express from 'express';
import {cardUpload} from '../multer';
import Vacancy from '../models/vacancy/Vacancy';
import { VacancyMutation } from '../types';
import { RequestWithEmployer } from '../middleware/employerAuth';
import Employer from "../models/employer/employerModel";

const vacanciesRouter = express.Router();
vacanciesRouter.post('/', async (req, res, next) => {
  const { title, description, city, salary, url, employer } = req.body;

  const employerId: Types.ObjectId = new Types.ObjectId(employer as string);

  try {
    const newVacancy: VacancyMutation = {
      title,
      description,
      city,
      salary: {
        min: salary.min ? parseFloat(salary.min) : null,
        max: salary.max ? parseFloat(salary.max) : null,
      },
      url,
      employer: employerId,
    };

    const vacancy = new Vacancy(newVacancy);
    await vacancy.save();
    const employerToUpdate = await Employer.findById(employerId);
    if (!employerToUpdate) {
      return res.status(404).send({ message: 'Employer not found' });
    }
    employerToUpdate.vacancies.push(vacancy._id);
    await employerToUpdate.save();

    return res.send(vacancy);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

vacanciesRouter.get('/', async (req: RequestWithEmployer, res, next) => {
  try {
    let filter = {};
    const employerId = req.query.employerId;

    if (employerId) {
      filter = { employer: employerId };
    }

    const results = await Vacancy.find(filter).sort({ createdAt: -1 });

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

vacanciesRouter.patch('/:id', cardUpload.single('logo'), async (req, res, next) => {
  const { title, description, company, city, salary, url } = req.body;
  const companyLogo = req.file ? req.file.filename : null;

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
      salary: {
        min: salary.min ? parseFloat(salary.min) : null,
        max: salary.max ? parseFloat(salary.max) : null,
      },
      url,
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
