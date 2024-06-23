import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../models/users/userModel';
import { imagesUpload } from '../multer';
import Employer from '../models/employer/employerModel';
import config from '../config';
import { OAuth2Client } from 'google-auth-library';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';
import ignoreAuth from '../middleware/ignoreAuth';
import {transporter} from "../mailer";
import Vacancy from '../models/vacancy/Vacancy';

const client = new OAuth2Client(config.google.clientId);

const userRouter = Router();

userRouter.post('/', imagesUpload.single('avatar'), async (req: RequestWithUser, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      avatar: req.file ? req.file.filename : null,
    });
    user.generateToken();
    await user.save();
    return res.send({ message: 'Регистрация прошла успешно!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    next(error);
  }
});

// Этот router нужен для получение всех архивированных моделей (user, moderators, vacancy, employee)
userRouter.get('/archives', auth, permit('superadmin', 'admin'), async (req: RequestWithUser, res, next) => {
  try {
    const deletedUser = await User.find({ isArchive: true, role: 'user' });
    const deletedEmployee = await Employer.find({ isArchive: true });
    const deletedModerators = await User.find({ isArchive: true, role: 'admin' });
    const deletedVacancy = await Vacancy.find({ archive: true }).populate('employer');

    return res.send({
      users: deletedUser,
      employee: deletedEmployee,
      moderators: deletedModerators,
      vacancies: deletedVacancy,
    });
  } catch (e) {
    return next(e);
  }
});

userRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Ошибка Google логина!' });
    }

    const email = payload['email'];

    const id = payload['sub'];
    const displayName = payload['name'];
    const image = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Недостаточно данных пользователя для продолжения' });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        email: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName: displayName ? displayName : email,
        image,
      });
    }
    user.generateToken();

    await user.save();
    return res.send({ message: 'Вход через Google выполнен успешно!', user });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    return next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      user = await Employer.findOne({ email: req.body.email });
    }

    if (!user || user.isArchive) {
      return res.status(422).send({ error: 'Электронная почта или пароль не верны!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Электронная почта или пароль не верны!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Вход выполнен успешно', user });
  } catch (error) {
    return next(error);
  }
});

userRouter.get('/', auth, permit('superadmin', 'admin', 'employer'), async (req: RequestWithUser, res, next) => {
  try {
    if (req.query.filter === 'moderator') {
      const moderators = await User.find({ role: 'admin', isArchive: false });
      return res.send(moderators);
    }
    if (req.query.filter) {
      const prof = req.query.filter;
      const filteredUsers = await User.find({
        preferredJob: { $regex: prof.toString(), $options: 'i' },
        isArchive: false,
      });
      return res.send(filteredUsers);
    }
    if (!req.query.filter) {
      const users = await User.find({ role: { $nin: ['admin', 'superadmin'] }, isArchive: false });
      return res.send(users);
    }
  } catch (error) {
    return next(error);
  }
});

userRouter.get('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
});

userRouter.patch('/:id', imagesUpload.single('avatar'), async (req: RequestWithUser, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const {
      name,
      firstName,
      surname,
      patronymic,
      gender,
      dateOfBirth,
      country,
      city,
      education,
      aboutMe,
      workExperience,
      preferredJob,
      preferredCity,
      contacts,
    } = req.body;
    if (user) {
      const updated = await User.findOneAndUpdate(
        { _id: user._id },
        {
          name,
          firstName,
          surname,
          patronymic,
          avatar: req.file ? req.file.filename : req.body.avatar,
          gender,
          dateOfBirth,
          country,
          city,
          education,
          aboutMe,
          workExperience: JSON.parse(workExperience),
          preferredJob,
          preferredCity,
          contacts: JSON.parse(contacts),
        },
        { new: true },
      );
      return res.send({ message: 'Данные изменены', updated });
    } else {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    return next(e);
  }
});

userRouter.patch('/archive/:id', auth, permit('superadmin', 'admin'), async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;
    const userQuery = req.query.user;
    const employeeQuery = req.query.employee;
    const moderatorQuery = req.query.moderator;
    const vacancyQuery = req.query.vacancy;

    if (userQuery) {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      user.isArchive = !user.isArchive;
      await user.save();
      return res.status(200).send({ message: 'User archive status updated successfully!' });
    }

    if (employeeQuery) {
      const employee = await Employer.findById(id);

      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      employee.isArchive = !employee.isArchive;
      await Vacancy.updateMany({ employer: employee._id }, { archive: employee.isArchive });
      await employee.save();

      return res.status(200).send({ message: 'Employee archive status updated successfully!' });
    }

    if (moderatorQuery) {
      const moderator = await User.findById(id);

      if (!moderator) {
        return res.status(404).send({ error: 'Moderator not found' });
      }

      moderator.isArchive = !moderator.isArchive;
      await moderator.save();
      return res.status(200).send({ message: 'Moderator archive status updated successfully!' });
    }

    if (vacancyQuery) {
      const vacancy = await Vacancy.findById(id);
      if (!vacancy) {
        return res.status(404).send({ error: 'Vacancy not found' });
      }

      vacancy.archive = !vacancy.archive;
      await vacancy.save();

      return res.status(200).send({ message: 'Vacancy archive status updated successfully!' });
    }

    return res.status(404).send({ message: 'Not found' });
  } catch (e) {
    next(e);
  }
});

userRouter.delete('/:id', ignoreAuth, async (req: RequestWithUser, res, next) => {
  if (req.params.id !== 'sessions' && (req.user?.role === 'superadmin' || req.user?.role === 'admin')) {
    try {
      const deletedModerator = await User.findByIdAndDelete(req.params.id);
      if (!deletedModerator) {
        return res.send({ text: 'Пользователь не найден!' });
      }
      return res.send({ text: 'Администратор успешно удален!' });
    } catch (e) {
      return next(e);
    }
  } else {
    try {
      const headerValue = req.get('Authorization');
      const successMessage = { message: 'Вы успешно вышли. До скорого!' };

      if (!headerValue) {
        return res.send({ ...successMessage, stage: 'No header' });
      }

      const [_bearer, token] = headerValue.split(' ');

      if (!token) {
        return res.send({ ...successMessage, stage: 'No token' });
      }

      const user = await User.findOne({ token });

      if (!user) {
        return res.send({ ...successMessage, stage: 'No user' });
      }

      user.generateToken();
      await user.save();

      return res.send({ ...successMessage, stage: 'Success' });
    } catch (e) {
      return next(e);
    }
  }
});

userRouter.post('/send-otp', async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(422).send({ error: 'Пользователь не найден' });
    }

    const otp = Math.floor(Math.random() * 900000).toString();

    user.otp = otp;

    await user.save();

    const mailOptions = {
      from: '<BerekeWorkOtp@gmail.com>',
      to: email,
      subject: 'Your OTP Code to Berekework',
      text: `Ваш OTP код ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, _info) => {
      if (error) {
        return next(error);
      } else {
        return res.status(200).send({message: `OTP отправлен на ${req.body.email}`});
      }
    });

  } catch (e) {
    return next(e);
  }
});

userRouter.post('/compare-otp', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    const otp = req.body.otp;

    if (user?.otp !== otp) {
      return res.status(422).send({ error: 'Неверный Otp' });
    }

    return res.status(200).send({message: 'Success'});

  } catch (e) {
    return next(e);
  }
});

userRouter.post('/change-password', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({ error: 'Пользователь не найден' });
    }

    user.password = password;
    user.generateToken();

    await user.save();

    return res.send({ message: 'Пароль изменен' });
  } catch (e) {
    return next(e);
  }
});



export default userRouter;
