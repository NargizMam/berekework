import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Vacancy from '../models/vacancy/Vacancy';
import Application from '../models/application/Application';
import mongoose, { Types } from 'mongoose';
import User from '../models/users/userModel';

const applicationsRouter = express.Router();

// Cоздать заявку может и соискатель и работодаель
applicationsRouter.post('/:vacancyId/:userId?', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { vacancyId, userId } = req.params;

    // Проверка существования вакансии
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ error: 'Vacancy not found' });
    }

    // Определение пользователя
    let user;
    if (req.user) {
      user = req.user; // Аутентифицированный пользователь
    } else if (req.employer && userId) {
      user = await User.findById(userId); // Пользователь, выбранный работодателем
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    } else {
      return res.status(400).json({ error: 'User not authenticated or specified' });
    }

    // Проверка на существование заявки, чтобы избежать дублирования
    const existingApplication = await Application.findOne({ vacancy: vacancyId, user: user._id });
    if (existingApplication) {
      return res.status(400).json({ error: 'Application already exists' });
    }

    // Создание новой заявки
    let newApplication;
    if (req.employer) {
      newApplication = new Application({
        vacancy: vacancyId,
        user: user._id,
        employerStatus: 'Ожидание ответа',
        userStatus: 'Новая вакансия',
      });
    } else {
      newApplication = new Application({
        vacancy: vacancyId,
        user: user._id,
      });
    }

    await newApplication.save();

    return res.send(newApplication);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

//Обновление статуса заявки - соисктелем и работодателем
applicationsRouter.patch('/:id', auth, async (req: RequestWithUser, res, next) => {
  const validStatuses = [
    'На рассмотрение',
    'Принят',
    'Отклонен',
    'Новая вакансия',
    'Заинтересован',
    'Новая заявка',
    'Ожидание ответа',
  ];
  try {
    // Проверка на корректность ObjectId
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    // Поиск заявки по ID
    const application = await Application.findById(_id).populate('vacancy');
    if (!application) {
      return res.status(404).send({ error: 'Application not found' });
    }

    // Если запрос исходит от пользователя
    if (req.user) {
      if (!validStatuses.includes(req.body.userStatus)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      if (!application.user.equals(req.user._id)) {
        return res.status(403).send({ error: 'Not authorized' });
      }

      application.userStatus = req.body.userStatus;
      application.employerStatus = req.body.userStatus; // Синхронизация статуса работодателя с пользовательским статусом

      const result = await application.save();
      if (!result) {
        return res.status(404).send({ message: 'Application not found' });
      }

      return res.send({ message: 'Status updated', application: result });
    } else if (req.employer) {
      // Если запрос исходит от работодателя
      if (!validStatuses.includes(req.body.employerStatus)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const vacancyId = application.vacancy._id;
      const vacancy = await Vacancy.findById(vacancyId).populate('employer');

      if (!vacancy) {
        return res.status(404).send({ error: 'Vacancy not found' });
      }

      if (vacancy.employer && !vacancy.employer._id.equals(req.employer?._id)) {
        return res.status(403).send({ error: 'Not authorized' });
      }

      application.employerStatus = req.body.employerStatus;
      application.userStatus = req.body.employerStatus; // Синхронизация статуса соискателя с работодателем

      const result = await application.save();
      if (!result) {
        return res.status(404).send({ message: 'Application not found' });
      }

      return res.send({ message: 'Status updated', application: result });
    } else {
      return res.status(403).send({ error: 'Not authorized' });
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

// Получение всех заявок. Пользователь видит только свои заявки. Работодатели видят заявки, связанные с их вакансиями. Aдмины видят все заявки.
applicationsRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;
    const employer = req.employer;
    let filter = {};

    if (user && (user.role === 'admin' || user.role === 'superadmin')) {
      // Администраторы видят все заявки
      filter = {};
    } else if (user) {
      // Пользователи видят только свои заявки
      filter = { user: user._id };
    } else if (employer) {
      // Работодатели видят заявки, связанные с их вакансиями
      const vacancies = await Vacancy.find({ employer: employer._id });

      if (!vacancies || vacancies.length === 0) {
        return res.status(404).send({ error: 'No vacancies found for this employer' });
      }

      filter = { vacancy: { $in: vacancies.map((v) => v._id) } };
    } else {
      return res.status(403).send({ error: 'Not authorized' });
    }

    const applications = await Application.find(filter).populate('vacancy').populate('user').sort({ createdAt: -1 });

    return res.send(applications);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

//Получение всех заявок для конкретной вакансии работодателя - доступ только у работодателя и админов.
applicationsRouter.get('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    // Проверка существования вакансии
    const vacancy = await Vacancy.findById(_id);

    if (!vacancy) {
      return res.status(404).send({ error: 'Vacancy not found' });
    }

    // Проверка прав доступа
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'superadmin');
    const isEmployer = vacancy.employer && vacancy.employer.equals(req.employer?._id);

    if (!isAdmin && !isEmployer) {
      return res.status(403).send({ error: 'Not authorized' });
    }

    const applications = await Application.find({ vacancy: _id })
      .populate('vacancy')
      .populate('user')
      .sort({ createdAt: -1 });

    return res.send(applications);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

// Удаление заявки. Доступ разрешен администратору и соискателям, работодателям создавшим заявку.
applicationsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const application = await Application.findById(_id).populate({
      path: 'vacancy',
      populate: { path: 'employer' },
    });

    if (!application) {
      return res.status(404).send({ error: 'Application not found' });
    }

    const vacancyId = application.vacancy._id;

    const vacancy = await Vacancy.findById(vacancyId).populate('employer');

    if (!vacancy) {
      return res.status(404).send({ error: 'Vacancy not found' });
    }

    // Проверка роли пользователя, создателя заявки или работодателя, создавшего вакансию
    const isAdmin = req.user?.role === 'superadmin';
    const isApplicant = application.user.equals(req.user?._id);
    const isEmployer = vacancy.employer ? vacancy.employer.equals(req.employer?._id) : false;

    // Проверка прав на удаление заявки
    if (!isAdmin && !isApplicant && !isEmployer) {
      return res.status(403).send({ error: 'Not authorized' });
    }

    const result = await Application.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).send({ error: 'Failed to delete application' });
    }

    return res.send({ message: 'Application deleted successfully' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

export default applicationsRouter;
