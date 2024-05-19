import { Router } from 'express';
import User from '../models/users/userModel';
import mongoose from 'mongoose';

import { imagesUpload, documentsUpload } from '../multer';
import Employer from '../models/employer/employerModel';

const userRouter = Router();

userRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    if (req.query && req.query.role) {
      const user = new User({
        displayName: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'admin',
      });
      user.generateToken();
      await user.save();
      return res.send({ message: 'Admin was created!' });
    } else {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        avatar: req.file ? req.file.filename : null,
      });
      user.generateToken();
      await user.save();
      return res.send({ message: 'Registered!', user });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    return next(error);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      user = await Employer.findOne({ email: req.body.email });
    }

    if (!user) {
      return res.status(422).send({ error: 'Email and password not correct!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Email and password not correct!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password are correct!', user });
  } catch (error) {
    return next(error);
  }
});
userRouter.get('/', async (req, res, next) => {
  try {
    if (req.query && req.query.role) {
      const moderators = await User.find({ role: 'admin' });
      return res.send(moderators);
    } else {
      const users = await User.find({ role: { $nin: ['admin', 'superadmin'] } });
      return res.send(users);
    }
  } catch (error) {
    return next(error);
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  if (req.params.id !== 'sessions') {
    try {
      const deletedModerator = await User.findByIdAndDelete(req.params.id);
      if (!deletedModerator) {
        return res.send('Модератор возможно был удален!');
      }
      return res.send('Модератор удачно удален!');
    } catch (e) {
      next(e);
    }
  } else {
    try {
      const headerValue = req.get('Authorization');
      const successMessage = { message: 'Success!' };

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

userRouter.patch('/:id', imagesUpload.single('avatar'), documentsUpload.array('documents'), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    let avatar: string | undefined | null = undefined;

    if (req.body.avatar === 'delete') {
      avatar = null;
    } else if (req.file) {
      avatar = req.file.filename;
    }

    let documents: string[] | null;

    if (req.body.documents) {
      documents = req.body.documents.filter((document: string) => document !== 'delete');
    } else {
      documents = [];
    }

    const contacts = req.body.contacts
      ? {
          phone: req.body.contacts.phone || null,
          whatsapp: req.body.contacts.whatsapp || null,
          telegram: req.body.contacts.telegram || null,
        }
      : null;

    if (user.role !== 'admin' && user.role !== 'superadmin') {
      const requiredFields = [
        'name',
        'surname',
        'gender',
        'dateOfBirth',
        'country',
        'city',
        'education',
        'aboutMe',
        'workExperience',
        'preferredJob',
        'preferredCity',
        'contacts.phone',
      ];

      for (const field of requiredFields) {
        // Проверка вложенных полей, таких как contacts.phone
        const value = field.includes('.') ? req.body[field.split('.')[0]]?.[field.split('.')[1]] : req.body[field];

        if (!value) {
          return res.status(400).send({ message: `${field} is required` });
        }
      }
    }

    const result = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name || null,
          surname: req.body.surname || null,
          patronymic: req.body.patronymic || null,
          gender: req.body.gender || null,
          dateOfBirth: req.body.dateOfBirth || null,
          country: req.body.country || null,
          city: req.body.city || null,
          education: req.body.education || null,
          aboutMe: req.body.aboutMe || null,
          workExperience: req.body.workExperience || null,
          preferredJob: req.body.preferredJob || null,
          preferredCity: req.body.preferredCity || null,
          contacts,
          avatar,
          documents,
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'User not found!' });
    }

    return res.send({ message: 'ok' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});
export default userRouter;
