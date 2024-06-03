import express from 'express';
import Vacancy from '../models/vacancy/Vacancy';
import mongoose from 'mongoose';
import employerAuth, { RequestWithEmployer } from '../middleware/employerAuth';

const vacancyRouter = express.Router();

vacancyRouter.post('/',  employerAuth, async (req: RequestWithEmployer, res, next) => {
  const {
    logoCompany,
    nameCompany,
    vacancyTitle,
    salary,
    city,
    aboutVacancy,
    responsibilities,
    workConditions,
    country,
    fieldOfWork,
    age,
    education,
    employmentType,
  } = req.body;

  try {
    const vacancyBlock = new Vacancy({
      logoCompany,
      nameCompany,
      vacancyTitle,
      salary: {
        minSalary: salary.minSalary,
        maxSalary: salary.maxSalary,
      },
      city,
      aboutVacancy,
      responsibilities,
      workConditions,
      country,
      fieldOfWork,
      age: {
        minAge: age.minAge,
        maxAge: age.maxAge,
      },
      education,
      employmentType,
      employer: req.body.employer,
    });

    await vacancyBlock.save();
    return res.send({ message: 'Vacancies successfully saved' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

vacancyRouter.get('/', async (req, res, next) => {
  try {
    const result = await Vacancy.find().populate('employer');

    return res.send(result);
  } catch (e) {
    next(e);
  }
});

vacancyRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;

    const result = await Vacancy.findById(id).populate('employer');
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

vacancyRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const {
    logoCompany,
    nameCompany,
    vacancyTitle,
    salary,
    city,
    aboutVacancy,
    responsibilities,
    workConditions,
    country,
    fieldOfWork,
    age,
    education,
    employmentType,
  } = req.body;

  try {
    const updatedVacancy = await Vacancy.findByIdAndUpdate(id, {
      logoCompany,
      nameCompany,
      vacancyTitle,
      salary: {
        minSalary: salary.minSalary,
        maxSalary: salary.maxSalary,
      },
      city,
      aboutVacancy,
      responsibilities,
      workConditions,
      country,
      fieldOfWork,
      age: {
        minAge: age.minAge,
        maxAge: age.maxAge,
      },
      education,
      employmentType,
    }, { new: true });

    if (!updatedVacancy) {
      return res.status(404).send({ message: 'Vacancy not found' });
    }

    return res.send({ message: 'Vacancy updated successfully', updatedVacancy });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

vacancyRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedVacancy = await Vacancy.findByIdAndDelete(id);

    if (!deletedVacancy) {
      return res.status(404).send({ message: 'Vacancy not found' });
    }

    return res.send({ message: 'Vacancy deleted successfully' });
  } catch (e) {
    next(e);
  }
});

export default vacancyRouter;