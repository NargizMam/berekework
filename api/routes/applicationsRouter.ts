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
    let createdBy;
    if (req.user) {
      user = req.user; // Аутентифицированный пользователь
      createdBy = 'user';
    } else if (req.employer && userId) {
      user = await User.findById(userId); // Пользователь, выбранный работодателем
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      createdBy = 'employer';
    } else {
      return res.status(400).json({ error: 'User not authenticated or specified' });
    }

    // Проверка принадлежности вакансии работодателю
    if (req.employer && !vacancy.employer?.equals(req.employer._id)) {
      return res.status(403).json({ error: 'You can only create an application for your own vacancies' });
    }

    // Проверка на существование заявки, чтобы избежать дублирования
    const existingApplication = await Application.findOne({ vacancy: vacancyId, user: user._id });
    if (existingApplication) {
      return res.status(400).json({ error: 'Отклик уже существует между вами и кандидатом' });
    }

    // Создание новой заявки
    let newApplication;
    if (req.employer) {
      newApplication = new Application({
        vacancy: vacancyId,
        user: user._id,
        employerStatus: 'Ожидание ответа',
        userStatus: 'Новая вакансия',
        createdBy,
      });
    } else {
      newApplication = new Application({
        vacancy: vacancyId,
        user: user._id,
        createdBy,
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
  const validStatuses = ['Принят', 'Заинтересован', 'Отклонен', 'Новая вакансия'];
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

// Получение всех заявок.
// Администраторы видят все заявки, которые не удалены обеими сторонами, т.е не удалены из базы данных.
// Пользователи видят только свои заявки, которые не удалены пользователем.
// Работодатели видят заявки, связанные с их вакансиями, которые не удалены работодателем.
applicationsRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;
    const employer = req.employer;
    let filter = {};

    if (user && (user.role === 'admin' || user.role === 'superadmin')) {
      // Администраторы видят все заявки
      filter = {};
    } else if (user) {
      // Пользователи видят только свои заявки, которые не удалены пользователем
      filter = { user: user._id, isDeletedByUser: false };
    } else if (employer) {
      // Работодатели видят заявки, связанные с их вакансиями, которые не удалены работодателем
      const vacancies = await Vacancy.find({ employer: employer._id });

      if (!vacancies || vacancies.length === 0) {
        return res.status(404).send({ error: 'No vacancies found for this employer' });
      }

      filter = { vacancy: { $in: vacancies.map((v) => v._id) }, isDeletedByEmployer: false };
    } else {
      return res.status(403).send({ error: 'Not authorized' });
    }

    const applications = await Application.find(filter)
      .populate({ path: 'vacancy', populate: { path: 'employer' } })
      .populate('user', '_id name surname dateOfBirth preferredJob contacts')
      .sort({ createdAt: -1 });

    return res.send(applications);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

// Получение всех заявок для конкретной вакансии работодателя - доступ только у работодателя и админов.
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

    // Фильтр заявок для конкретной вакансии
    let filter: { [key: string]: any } = { vacancy: _id };

    // Работодатели видят заявки, которые не были удалены ими
    if (isEmployer) {
      filter = { vacancy: _id, isDeletedByEmployer: false };
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

//Удаление заявки. Доступ разрешен администратору, соискателям, работодателям.
applicationsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const application = await Application.findById(_id).populate('vacancy');

    if (!application) {
      return res.status(404).send({ error: 'Application not found' });
    }

    const vacancyId = application.vacancy._id;

    const vacancy = await Vacancy.findById(vacancyId).populate('employer');

    if (!vacancy) {
      return res.status(404).send({ error: 'Vacancy not found' });
    }

    // Проверка прав на удаление заявки
    const isAdmin = req.user?.role === 'superadmin';
    const isApplicant = application.user.equals(req.user?._id);
    const isEmployer = vacancy.employer ? vacancy.employer.equals(req.employer?._id) : false;

    if (!isAdmin && !isApplicant && !isEmployer) {
      return res.status(403).send({ error: 'Not authorized' });
    }

    let message = '';

    // Логика удаления для супер админа
    if (isAdmin) {
      await Application.findByIdAndDelete(_id);
      return res.send({ message: 'Application permanently deleted by superadmin' });
    }

    // Установка флагов удаления и обновление статуса для всех пользователей
    application.userStatus = 'Отклонен'; // Обновление статуса соискателя на "Отклонен"
    application.employerStatus = 'Отклонен'; // Обновление статуса работодателя на "Отклонен"

    if (isApplicant) {
      application.isDeletedByUser = true;
      message = 'Application deleted by applicant and both statuses set to "Отклонен"';
    } else if (isEmployer) {
      application.isDeletedByEmployer = true;
      message = 'Application deleted by employer and both statuses set to "Отклонен"';
    }

    // Если оба флага установлены, удаляем заявку из базы данных
    if (application.isDeletedByUser && application.isDeletedByEmployer) {
      await Application.findByIdAndDelete(_id);
      return res.send({ message: 'Application permanently deleted as both user and employer marked it deleted' });
    }

    // В противном случае сохраняем изменения
    const result = await application.save();

    return res.send({ message, application: result });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

export default applicationsRouter;
