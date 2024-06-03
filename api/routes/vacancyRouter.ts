import express from 'express';
import Vacancy from '../models/vacancy/Vacancy';
import mongoose from 'mongoose';
import employerAuth, { RequestWithEmployer } from '../middleware/employerAuth';
import { VacancyI } from '../types';

const vacancyRouter = express.Router();

vacancyRouter.post('/', employerAuth, async (req: RequestWithEmployer, res, next) => {
  const {
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
    const vacancyPage = req.query.vacancyPage;
    const categoryVacancy = req.query.getCategory;
    const filterCategory = req.query.category;
    const { salary, age, ...categories } = req.query;

    if (vacancyPage) {
      const result = await Vacancy.find()
        .select('vacancyTitle salary city')
        .populate('employer', '-_id companyName logo');
      return res.send(result);
    }

    if (categoryVacancy) {
      const countryCategory: string[] = [];
      const cityCategory: string[] = [];
      const fieldOfWorkCategory: string[] = [];
      const educationCategory: string[] = [];
      const employmentTypeCategory: string[] = [];

      let vacancyCategory = {
        country: [''],
        city: [''],
        fieldOfWork: [''],
        education: [''],
        employmentType: [''],
      };

      const vacancies: VacancyI[] = await Vacancy.find();
      vacancies.forEach((vacancy) => {
        countryCategory.push(vacancy.country);
        cityCategory.push(vacancy.city);
        fieldOfWorkCategory.push(vacancy.fieldOfWork);
        educationCategory.push(vacancy.education);
        employmentTypeCategory.push(vacancy.employmentType);
      });

      vacancyCategory.city = [...new Set(cityCategory)];
      vacancyCategory.country = [...new Set(countryCategory)];
      vacancyCategory.fieldOfWork = [...new Set(fieldOfWorkCategory)];
      vacancyCategory.education = [...new Set(educationCategory)];
      vacancyCategory.employmentType = [...new Set(employmentTypeCategory)];

      return res.send(vacancyCategory);
    }

    if (filterCategory) {
      let filteredVacancies: VacancyI[] = [];
      const vacancies: VacancyI[] = await Vacancy.find();

      if (categories.hasOwnProperty('city')) {
        const vacancies: VacancyI[] = await Vacancy.find({ city: categories.city });
        filteredVacancies.push(...vacancies);
      }

      if (categories.hasOwnProperty('education')) {
        const vacancies: VacancyI[] = await Vacancy.find({ education: categories.education });
        filteredVacancies.push(...vacancies);
      }

      if (categories.hasOwnProperty('country')) {
        const vacancies: VacancyI[] = await Vacancy.find({ country: categories.country });
        filteredVacancies.push(...vacancies);
      }

      if (categories.hasOwnProperty('fieldOfWork')) {
        const vacancies: VacancyI[] = await Vacancy.find({ fieldOfWork: categories.fieldOfWork });
        filteredVacancies.push(...vacancies);
      }

      if (categories.hasOwnProperty('employmentType')) {
        const vacancies: VacancyI[] = await Vacancy.find({ employmentType: categories.employmentType });
        filteredVacancies.push(...vacancies);
      }

      if (salary) {
        const salaryValue = parseInt(salary as string);
        if (filteredVacancies.length === 0) {
          filteredVacancies = vacancies.filter(
            (vacancy) => vacancy.salary.minSalary <= salaryValue && vacancy.salary.maxSalary >= salaryValue,
          );
        } else {
          filteredVacancies = filteredVacancies.filter(
            (vacancy) => vacancy.salary.minSalary <= salaryValue && vacancy.salary.maxSalary >= salaryValue,
          );
        }
      }

      if (age) {
        const ageStr = age as string;
        const [minAge, maxAge] = ageStr.split('-').map(Number);

        if (filteredVacancies.length === 0) {
          filteredVacancies = vacancies.filter(
            (vacancy) => vacancy.age.minAge <= minAge && vacancy.age.maxAge >= maxAge,
          );
        } else {
          filteredVacancies = filteredVacancies.filter(
            (vacancy) => vacancy.age.minAge <= minAge && vacancy.age.maxAge >= maxAge,
          );
        }
      }

      const uniqueArr = filteredVacancies.filter((item, index) => {
        const ids = filteredVacancies.map((vacancy) => vacancy._id);
        return ids.findIndex((id) => id.equals(item._id)) === index;
      });

      return res.send(uniqueArr);
    }

    const result = await Vacancy.find();
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

vacancyRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Vacancy.findById(id);
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

vacancyRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const {
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
    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true },
    );

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
