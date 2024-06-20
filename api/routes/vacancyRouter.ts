import express from 'express';
import Vacancy from '../models/vacancy/Vacancy';
import mongoose from 'mongoose';
import { VacancyI } from '../types';
import auth, { RequestWithUser } from '../middleware/auth';
import Employer from '../models/employer/employerModel';
import Application from '../models/application/Application';

const vacancyRouter = express.Router();

vacancyRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
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
      employer: req.employer?._id,
    });

    const vacancy = await vacancyBlock.save();
    const employee = await Employer.findById(req.employer?._id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee Not Found' });
    }

    employee.vacancies.push(vacancy._id);

    await employee.save();

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
    const categoryVacancy = req.query.getCategory;
    const { searchTerm } = req.query;
    const filterCategory = req.query.category;
    const { salary, age, ...categories } = req.query;
    const { abroad, kyrgyzstan } = req.query;
    const vacancyCard = req.query.vacancyCard;

    if (vacancyCard) {
      if (searchTerm) {
        const employers = await Employer.find({ companyName: { $regex: searchTerm, $options: 'i' } });

        if (employers.length > 0) {
          const employerIds = employers.map((employer) => employer._id);
          const filteredVacancies = await Vacancy.find({ employer: { $in: employerIds }, archive: false })
            .select('vacancyTitle salary city')
            .populate('employer', '-_id companyName avatar')
            .sort({ createdAt: -1 });
          return res.send(filteredVacancies);
        } else {
          const filteredVacancies = await Vacancy.find({
            vacancyTitle: { $regex: searchTerm, $options: 'i' },
            archive: false,
          })
            .select('vacancyTitle salary city')
            .populate('employer', '-_id companyName avatar')
            .sort({ createdAt: -1 });
          return res.send(filteredVacancies);
        }
      }

      const result = await Vacancy.find({ archive: false })
        .select('vacancyTitle salary city')
        .populate('employer', '-_id companyName avatar')
        .sort({ createdAt: -1 });
      return res.send(result);
    }

    if (abroad) {
      const filteredVacancies = await Vacancy.find({ country: { $ne: 'Кыргызстан' }, archive: false })
        .select('vacancyTitle salary city')
        .populate('employer', '-_id companyName avatar');
      return res.send(filteredVacancies);
    }

    if (kyrgyzstan) {
      const filteredVacancies = await Vacancy.find({ country: 'Кыргызстан', archive: false })
        .select('vacancyTitle salary city')
        .populate('employer', '-_id companyName avatar');
      return res.send(filteredVacancies);
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

      const vacancies: VacancyI[] = await Vacancy.find({ archive: false });
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
      const vacancies: VacancyI[] = await Vacancy.find({ archive: false })
        .select('vacancyTitle salary city')
        .populate('employer', '-_id companyName avatar');

      if (categories.hasOwnProperty('city')) {
        const vacancies: VacancyI[] = await Vacancy.find({ city: categories.city, archive: false })
          .select('vacancyTitle salary city')
          .populate('employer', '-_id companyName avatar');
        filteredVacancies.push(...vacancies);
      }

      if (categories.hasOwnProperty('education')) {
        const vacancies: VacancyI[] = await Vacancy.find({ education: categories.education, archive: false })
          .select('vacancyTitle salary city')
          .populate('employer', '-_id companyName avatar');
        filteredVacancies.push(...vacancies);
      }

      if (categories.hasOwnProperty('country')) {
        const vacancies: VacancyI[] = await Vacancy.find({ country: categories.country, archive: false })
          .select('vacancyTitle salary city')
          .populate('employer', '-_id companyName avatar');
        filteredVacancies.push(...vacancies);
      }

      if (categories.hasOwnProperty('fieldOfWork')) {
        const vacancies: VacancyI[] = await Vacancy.find({ fieldOfWork: categories.fieldOfWork, archive: false })
          .select('vacancyTitle salary city')
          .populate('employer', '-_id companyName avatar');
        filteredVacancies.push(...vacancies);
      }

      if (categories.hasOwnProperty('employmentType')) {
        const vacancies: VacancyI[] = await Vacancy.find({ employmentType: categories.employmentType, archive: false })
          .select('vacancyTitle salary city')
          .populate('employer', '-_id companyName avatar');
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

    const result = await Vacancy.find({ archive: false }).populate('employer');
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

vacancyRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Vacancy.findById({ _id: id, archive: false }).populate(
      'employer',
      '-_id -token -industry -documents -role -isPublished',
    );
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

vacancyRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const vacancyById = await Vacancy.findById(req.params.id);

    if (!vacancyById) {
      return res.status(404).send({ error: 'Vacancy not found' });
    }

    const isAdmin = req.user?.role === 'superadmin';
    const isEmployer = vacancyById.employer ? vacancyById.employer.equals(req.employer?._id) : false;

    if (!isAdmin && !isEmployer) {
      return res.status(403).send({ error: 'Not authorized' });
    }

    if (isAdmin) {
      await Application.deleteMany({ vacancy: req.params.id });
      await Vacancy.findByIdAndDelete(req.params.id);
    }

    if (isEmployer) {
      vacancyById.archive = true;
      await vacancyById.save();
    }

    // Обновить статусы заявок на "Вакансия закрыта"
    await Application.updateMany(
      { vacancy: vacancyById._id },
      {
        userStatus: 'Вакансия закрыта',
        employerStatus: 'Вакансия закрыта',
        $push: {
          statusHistory: {
            status: 'Вакансия закрыта',
            changedBy: 'employer',
            changedAt: new Date(),
          },
        },
      },
    );

    return res.send({ message: 'Vacancy deleted successfully' });
  } catch (e) {
    next(e);
  }
});

export default vacancyRouter;
