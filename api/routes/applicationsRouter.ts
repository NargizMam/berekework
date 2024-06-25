import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Vacancy from '../models/vacancy/Vacancy';
import Application from '../models/application/Application';
import mongoose, { Types } from 'mongoose';
import User from '../models/users/userModel';

const applicationsRouter = express.Router();

applicationsRouter.post('/:vacancyId/:userId?', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { vacancyId, userId } = req.params;

    // Проверка существования вакансии
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ error: 'Vacancy not found' });
    }

    if (vacancy.archive) {
      return res.status(403).json({ error: 'Нельзя создать заявку на архивированную вакансию' });
    }

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

    // Проверка на существование заявок, чтобы избежать дублирования
    const existingApplications = await Application.find({ vacancy: vacancyId, user: user._id });
    const hasNonRejectedApplication = existingApplications.some((application) => application.userStatus !== 'Отклонен');

    if (hasNonRejectedApplication) {
      return res.status(400).json({ error: 'Между вами и этой вакансией уже существует активный отклик.' });
    }

    const existingApplication = existingApplications.find((application) => application.userStatus === 'Отклонен');

    if (existingApplication) {
      //Перезаписывание существующей заявки, если она была отклонена и восстанавливает создатель заявки
      if (existingApplication.createdBy === createdBy) {
        existingApplication.isDeletedByUser = false;
        existingApplication.isDeletedByEmployer = false;

        if (createdBy === 'employer') {
          existingApplication.userStatus = 'Новая вакансия';
          existingApplication.employerStatus = 'Ожидание ответа';
        } else {
          existingApplication.userStatus = 'На рассмотрении';
          existingApplication.employerStatus = 'Новая заявка';
        }

        existingApplication.statusHistory.push({
          status: createdBy === 'employer' ? 'Ожидание ответа' : 'На рассмотрении',
          changedBy: createdBy,
          changedAt: new Date(),
        });

        await existingApplication.save();
        return res.send(existingApplication);
      }
    }

    // Создание новой заявки, если заявка восстанавливается не создателем или нет других активных заявок
    const statusHistoryEntry = {
      status: createdBy === 'employer' ? 'Ожидание ответа' : 'На рассмотрении',
      changedBy: createdBy,
      changedAt: new Date(),
    };

    let newApplication;
    if (req.employer) {
      newApplication = new Application({
        vacancy: vacancyId,
        user: user._id,
        employerStatus: 'Ожидание ответа',
        userStatus: 'Новая вакансия',
        createdBy,
        statusHistory: [statusHistoryEntry],
      });
    } else {
      newApplication = new Application({
        vacancy: vacancyId,
        user: user._id,
        createdBy,
        statusHistory: [statusHistoryEntry],
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
      return res.status(404).send({ error: 'Заявка не найдена' });
    }

    // Проверка статуса вакансии
    const vacancy = await Vacancy.findById(application.vacancy._id);
    if (!vacancy) {
      return res.status(404).send({ error: 'Вакансия не найдена' });
    }

    if (vacancy.archive) {
      return res.status(403).send({ error: 'Вакансия закрыта' });
    }

    // Проверка текущего статуса заявки
    if (application.userStatus === 'Отклонен' || application.employerStatus === 'Отклонен') {
      return res.status(403).send({ error: 'Изменение статуса отклоненной заявки невозможно' });
    }

    let updatedBy, newStatus;

    // Если запрос исходит от пользователя
    if (req.user) {
      newStatus = req.body.userStatus;
      if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ error: 'Некорректный статус' });
      }

      if (!application.user.equals(req.user._id)) {
        return res.status(403).send({ error: 'Нет прав для выполнения действия' });
      }

      application.userStatus = newStatus;
      application.employerStatus = newStatus; // Синхронизация статуса работодателя с пользовательским статусом
      updatedBy = 'user';
    } else if (req.employer) {
      // Если запрос исходит от работодателя
      newStatus = req.body.employerStatus;
      if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ error: 'Некорректный статус' });
      }

      const vacancyId = application.vacancy._id;
      const vacancy = await Vacancy.findById(vacancyId).populate('employer');

      if (!vacancy) {
        return res.status(404).send({ error: 'Вакансия не найдена' });
      }

      if (vacancy.employer && !vacancy.employer._id.equals(req.employer?._id)) {
        return res.status(403).send({ error: 'Нет прав для выполнения действия' });
      }

      application.employerStatus = newStatus;
      application.userStatus = newStatus; // Синхронизация статуса соискателя с работодателем
      updatedBy = 'employer';
    } else {
      return res.status(403).send({ error: 'Нет прав для выполнения действия' });
    }

    // Создание записи в статус истории и добавление её в массив статус истории
    const statusHistoryEntry = {
      status: newStatus,
      changedBy: updatedBy,
      changedAt: new Date(),
    };

    application.statusHistory.push(statusHistoryEntry);

    const result = await application.save();
    if (!result) {
      return res.status(404).send({ message: 'Заявка не найдена' });
    }

    return res.send({ message: 'Статус обновлен', application: result });
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

    if (!isAdmin && !isEmployer && !req.user) {
      return res.status(403).send({ error: 'Not authorized' });
    }

    // Фильтр заявок для конкретной вакансии
    let filter: { [key: string]: any } = { vacancy: _id };

    // Работодатели видят заявки, которые не были удалены ими
    if (isEmployer) {
      filter = { vacancy: _id, isDeletedByEmployer: false };
    }

    // Пользователи видят только свои заявки
    if (req.user) {
      filter = { vacancy: _id, user: req.user._id, isDeletedByUser: false };
    }

    const applications = await Application.find(filter)
      .populate({
        path: 'vacancy',
        select: 'vacancyTitle employer',
        populate: {
          path: 'employer',
          select: 'companyName',
        },
      })
      .populate('user', 'email')
      .sort({ createdAt: -1 });

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
      return res.send({ message: 'Заявка окончательно удалена супер администратором' });
    }

    // Установка флагов удаления и обновление статуса для всех пользователей
    if (!vacancy.archive) {
      application.userStatus = 'Отклонен'; // Обновление статуса соискателя на "Отклонен"
      application.employerStatus = 'Отклонен'; // Обновление статуса работодателя на "Отклонен"

      let statusHistoryEntry;
      const lastStatusEntry =
        application.statusHistory.length > 0 ? application.statusHistory[application.statusHistory.length - 1] : null;

      if (isApplicant) {
        application.isDeletedByUser = true;
        message = 'Заявка удалена соискателем, и оба статуса установлены на "Отклонен"';
        if (lastStatusEntry?.status !== 'Отклонен') {
          statusHistoryEntry = {
            status: 'Отклонен',
            changedBy: 'user',
            changedAt: new Date(),
          };
        }
      } else if (isEmployer) {
        application.isDeletedByEmployer = true;
        message = 'Заявка удалена работодателем, и оба статуса установлены на "Отклонен"';
        if (lastStatusEntry?.status !== 'Отклонен') {
          statusHistoryEntry = {
            status: 'Отклонен',
            changedBy: 'employer',
            changedAt: new Date(),
          };
        }
      }

      // Добавление записи в историю статусов
      if (statusHistoryEntry) {
        application.statusHistory.push(statusHistoryEntry);
      }
    } else {
      if (isApplicant) {
        application.isDeletedByUser = true;
        message = 'Заявка удалена соискателем';
      } else if (isEmployer) {
        application.isDeletedByEmployer = true;
        message = 'Заявка удалена работодателем';
      }
    }

    // Сохраняем изменения
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
