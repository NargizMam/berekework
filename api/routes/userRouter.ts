import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../models/users/userModel';
import { imagesUpload, documentsUpload } from '../multer';
import Employer from '../models/employer/employerModel';
import config from '../config';
import { OAuth2Client } from 'google-auth-library';
import permit from '../middleware/permit';
import auth from '../middleware/auth';
import Applicant from '../models/applicants/Applicant';

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
      return res.send({ message: 'Admin was created!' });
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
      return res.send({ message: 'Registered!', user });
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
      return res.status(400).send({ error: 'Google login error!' });
    }

    const email = payload['email'];

    const id = payload['sub'];
    const displayName = payload['name'];
    const image = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
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
    return res.send({ message: 'Login with Google successful!', user });
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

userRouter.get('/', auth, permit('superadmin', 'admin', 'employer'), async (req, res, next) => {
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

userRouter.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    return res.send(user);
  } catch (error) {
    return next(error);
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

userRouter.delete('/:id', async (req, res, next) => {
  if (req.params.id !== 'sessions') {
    try {
      const deletedModerator = await User.findByIdAndDelete(req.params.id);
      if (!deletedModerator) {
        return res.send({ text: 'not found!' });
      }
      return res.send({ text: 'User deleted' });
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

export default userRouter;
