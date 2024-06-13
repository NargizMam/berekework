import mongoose from 'mongoose';
import {Router} from 'express';
import User from '../models/users/userModel';
import {imagesUpload} from '../multer';
import Employer from '../models/employer/employerModel';
import config from '../config';
import {OAuth2Client} from 'google-auth-library';
import permit from '../middleware/permit';
import auth, {RequestWithUser} from '../middleware/auth';

const client = new OAuth2Client(config.google.clientId);

const userRouter = Router();

userRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    if (req.query && req.query.role) {
      const user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: req.body.password,
        role: 'admin',
      });
      user.generateToken();
      await user.save();
      return res.send({ message: 'Администратор успешно создан!', user });
    } else {
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
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    next(error);
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

    if (!user) {
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
      const moderators = await User.find({ role: 'admin' });
      return res.send(moderators);
    }
    if (req.query.filter) {
      const prof = req.query.filter;
      const filteredUsers = await User.find({ preferredJob: { $regex: prof.toString(), $options: 'i' } });
      return res.send(filteredUsers);
    }
    if (!req.query.filter) {
      const users = await User.find({ role: { $nin: ['admin', 'superadmin'] } });
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

userRouter.patch('/:id', imagesUpload.single('avatar'),  async (req: RequestWithUser, res, next) => {
  // try {
  //   const user = await User.findById(req.params.id);
  //
  //   if (!user) {
  //     return res.status(404).send({ message: 'User not found!' });
  //   }
  //
  //   // let avatar: string | undefined | null = undefined;
  //   //
  //   // if (req.body.avatar === 'delete') {
  //   //   avatar = null;
  //   // } else if (req.file) {
  //   //   avatar = req.file.filename;
  //   // }
  //
  //   // const contacts = req.body.contacts
  //   //   ? {
  //   //       phone: req.body.contacts.phone || null,
  //   //       whatsapp: req.body.contacts.whatsapp || null,
  //   //       telegram: req.body.contacts.telegram || null,
  //   //     }
  //   //   : null;
  //
  //   if (user.role === 'user') {
  //     const requiredFields = [
  //       'name',
  //       'surname',
  //       'gender',
  //       'dateOfBirth',
  //       'country',
  //       'city',
  //       'education',
  //       'aboutMe',
  //       'workExperience',
  //       'preferredJob',
  //       'preferredCity',
  //     ];
  //
  //     // for (const field of requiredFields) {
  //     //   // Проверка вложенных полей, таких как contacts.phone
  //     //   const value = field.includes('.') ? req.body[field.split('.')[0]]?.[field.split('.')[1]] : req.body[field];
  //     //
  //     //   if (!value) {
  //     //     return res.status(400).send({ message: `${field} is required` });
  //     //   }
  //     // }
  //   }
  //
  //   const result = await User.updateOne(
  //     { _id: req.params.id },
  //     {
  //       $set: {
  //         name: req.body.name || null,
  //         surname: req.body.surname || null,
  //         patronymic: req.body.patronymic || null,
  //         gender: req.body.gender || null,
  //         dateOfBirth: req.body.dateOfBirth || null,
  //         country: req.body.country || null,
  //         city: req.body.city || null,
  //         education: req.body.education || null,
  //         aboutMe: req.body.aboutMe || null,
  //         workExperience: req.body.workExperience || null,
  //         preferredJob: req.body.preferredJob || null,
  //         preferredCity: req.body.preferredCity || null,
  //         contacts,
  //         avatar,
  //       },
  //     },
  //   );
  //
  //   if (result.matchedCount === 0) {
  //     return res.status(404).send({ message: 'User not found!' });
  //   }
  //
  //   return res.send({ message: 'ok' });
  // } catch (e) {
  //   if (e instanceof mongoose.Error.ValidationError) {
  //     return res.status(422).send(e);
  //   }
  //   next(e);
  // }
    try {
      const user = await User.findById(req.params.id);
      const {
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
        contacts
      } = req.body;
      if (user) {
        const updated = await User.findOneAndUpdate(
            {_id: user._id},
            {
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
            {new: true}
        );
        return res.send(updated);
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

userRouter.delete('/:id', async (req, res, next) => {
  if (req.params.id !== 'sessions') {
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
      const successMessage = { message: 'Вы вышли из приложения!' };

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

      return res.send({ ...successMessage, stage: 'Вы вышли из приложения!' });
    } catch (e) {
      return next(e);
    }
  }
});

export default userRouter;
