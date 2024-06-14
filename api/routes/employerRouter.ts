import { Router } from 'express';
import mongoose from 'mongoose';
import Employer from '../models/employer/employerModel';
import { multiUpload } from '../multer';
import { UploadedFiles } from '../types';
import { transporter } from '../mailer';

const employerRouter = Router();

employerRouter.post(
  '/',
  multiUpload.fields([
    { name: 'document', maxCount: 1 },
    { name: 'avatar', maxCount: 1 },
  ]),

  async (req, res, next) => {
    try {
      const files: UploadedFiles = req.files as UploadedFiles;
      const employer = new Employer({
        email: req.body.email,
        password: req.body.password,
        companyName: req.body.companyName,
        foundationYear: req.body.foundationYear,
        documents: files['document'] ? files['document'][0].filename : null,
        industry: req.body.industry,
        description: req.body.description,
        address: req.body.address,
        contacts: req.body.contacts,
        avatar: files['avatar'] ? files['avatar'][0].filename : null,
      });
      employer.generateToken();
      await employer.save();

      await transporter.sendMail({
        from: '04072002mu@gmail.com',
        to: req.body.email,
        subject: 'new employer!!',
        text: `${req.body.email} already to employer!`,
      });
      return res.send({ message: 'Работодатель создан!', employer });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }
      return next(error);
    }
  },
);

employerRouter.patch('/:id', async (req, res, next) => {
  try {
    const employer = await Employer.findByIdAndUpdate(
      req.params.id,
      [
        {
          $set: {
            isPublished: {
              $cond: {
                if: { $eq: [req.body.tariff, ''] },
                then: false,
                else: true,
              },
            },
          },
        },
        { $set: { tariff: req.body.tariff } },
      ],
      { new: true },
    );

    if (!employer) {
      return res.status(404).send({ message: 'Работодатель не найден!' });
    }

    await transporter.sendMail({
      from: '04072002mu@gmail.com',
      to: req.body.email,
      subject: 'Employer details updated',
      text: `${req.body.email}, Ваш статус работодателя был обновлен!`,
    });

    return res.send({ message: 'Работодатель обновлен успешно!', employer });
  } catch (error) {
    return next(error);
  }
});

employerRouter.put(
    '/:id',
    multiUpload.fields([
      { name: 'document', maxCount: 1 },
      { name: 'avatar', maxCount: 1 },
    ]),
    async (req, res, next) => {
      try {
        const files = req.files as UploadedFiles;
        const employerId = req.params.id;
        console.log(req.body)
        const updateData: any = {};

        if (req.body.email) updateData.email = req.body.email;
        if (req.body.password) updateData.password = req.body.password;
        if (files['avatar']) updateData.avatar = files['avatar'][0].filename;
        if (req.body.companyName) updateData.companyName = req.body.companyName;
        if (req.body.foundationYear) updateData.foundationYear = req.body.foundationYear;
        if (files['document']) updateData.documents = files['document'][0].filename;
        if (req.body.industry) updateData.industry = req.body.industry;
        if (req.body.description) updateData.description = req.body.description;
        if (req.body.address) updateData.address = req.body.address;
        if (req.body.contacts) updateData.contacts = req.body.contacts;
        if (req.body.adminsComment) updateData.adminsComment = req.body.adminsComment;

        const employer = await Employer.findByIdAndUpdate(employerId, updateData, { new: true });
        console.log(employer, 'employer')
        if (!employer) {
          return res.status(404).send({ message: 'Employer not found!' });
        }

        if (req.body.email) {
          await transporter.sendMail({
            from: '04072002mu@gmail.com',
            to: req.body.email,
            subject: 'Employer details updated',
            text: `${req.body.email}, your employer details have been updated!`,
          });
        }

        return res.send({ message: 'Employer updated successfully!', employer });
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(422).send(error);
        }
        return next(error);
      }
    },
);

employerRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Employer.find();
    res.send(results);
  } catch (error) {
    return next(error);
  }
});

employerRouter.get('/:id', async (req, res, next) => {
  try {
    const results = await Employer.findById(req.params.id).populate({
      path: 'vacancies',
      match: { archive: false },
      populate: { path: 'employer' },
    });
    res.send(results);
  } catch (error) {
    return next(error);
  }
});

employerRouter.delete('/:id', async (req, res, next) => {
  try {
    await Employer.findByIdAndDelete(req.params.id);
    await transporter.sendMail({
      from: '04072002mu@gmail.com',
      to: req.body.email,
      subject: 'Employer deleted!',
      text: `${req.body.email}, deleted!`,
    });
    res.send({ message: 'Работодатель удален!' });
  } catch (error) {
    return next(error);
  }
});

employerRouter.post('/sessions', async (req, res, next) => {
  try {
    let employer = await Employer.findOne({ email: req.body.email });

    if (!employer) {
      employer = await Employer.findOne({ email: req.body.email });
    }

    if (!employer) {
      return res.status(422).send({ error: 'Электронная почта или пароль не верны!' });
    }

    const isMatch = await employer.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Электронная почта или пароль не верны!' });
    }

    employer.generateToken();
    await employer.save();

    return res.send({ message: 'Вы успешно вошли в приложение!', employer });
  } catch (error) {
    return next(error);
  }
});

export default employerRouter;
