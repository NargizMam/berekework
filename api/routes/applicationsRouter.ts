import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Vacancy from '../models/vacancy/Vacancy';
import Application from '../models/application/Application';
import mongoose, { Types } from 'mongoose';
import employerAuth, { RequestWithEmployer } from '../middleware/employerAuth';

const applicationsRouter = express.Router();

//Создание новой заявки на вакансию. Требуется аутентификация пользователя.
applicationsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { vacancyId } = req.body;

    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ error: 'Vacancy not found' });
    }

    const newApplication = new Application({
      vacancy: vacancyId,
      user: req.user?._id,
    });

    await newApplication.save();

    return res.send(newApplication);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

// Получение всех заявок. Доступ разрешен администратору или пользователям, создавшим заявку.
applicationsRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;
    let filter = {};

    if (user && (user.role === 'admin' || user.role === 'superadmin')) {
      filter = {};
    } else if (user) {
      filter = { user: user._id };
    }

    const response = await Application.find(filter);
    return res.send(response);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

//Получение всех заявок для конкретной вакансии работодателя. Доступ разрешен работодателям, создавшим вакансию.
applicationsRouter.get('/:id', employerAuth, async (req: RequestWithEmployer, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const vacancy = await Vacancy.findById(_id);

    if (!vacancy) {
      return res.status(404).send({ error: 'Vacancy not found' });
    }

    if (vacancy.employer !== req.employer?._id) {
      return res.status(403).send({ error: 'Not authorized' });
    }

    const applications = await Application.find({ vacancy: _id });

    return res.send(applications);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

// Удаление заявки. Доступ разрешен администратору или пользователям, создавшим заявку.
applicationsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const application = await Application.findById(_id);

    if (!application) {
      return res.status(404).send({ error: 'Application not found' });
    }

    if (req.user?.role !== 'superadmin' && application.user !== req.user?._id) {
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

// Обновление статуса заявки. Доступ разрешен работодателю, получившему заявку.
applicationsRouter.patch('/:id', employerAuth, async (req: RequestWithEmployer, res, next) => {
  const validStatuses = ['Новая', 'На рассмотрении', 'Принят', 'Отклонен'];

  try {
    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const application = await Application.findById(req.params.id).populate('vacancy');

    if (!application) {
      return res.status(404).send({ error: 'Application not found' });
    }

    const vacancyId = application.vacancy._id;

    const vacancy = await Vacancy.findById(vacancyId).populate('employer');

    if (!vacancy) {
      return res.status(404).send({ error: 'Vacancy not found' });
    }

    if (vacancy.employer?._id !== req.employer?._id) {
      return res.status(403).send({ error: 'Not authorized' });
    }

    if (!vacancy) {
      return res.status(404).send({ error: 'Vacancy not found' });
    }

    const result = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true },
    );

    if (!result) {
      return res.status(404).send({ message: 'Application not found' });
    }

    return res.send({ message: 'ok' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

export default applicationsRouter;
