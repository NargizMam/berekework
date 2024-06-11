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
    { name: 'logo', maxCount: 1 },
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
      return res.send({ message: 'Employer is ready!', employer });
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
      return res.status(404).send({ message: 'Employer not found!' });
    }

    await transporter.sendMail({
      from: '04072002mu@gmail.com',
      to: req.body.email,
      subject: 'Employer details updated',
      text: `${req.body.email}, your employer status have been updated!`,
    });

    return res.send({ message: 'Employer updated successfully!', employer });
  } catch (error) {
    return next(error);
  }
});

employerRouter.put(
  '/:id',
  multiUpload.fields([
    { name: 'document', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'avatar', maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const files: UploadedFiles = req.files as UploadedFiles;
      const employerId = req.params.id;

      const updateData = {
        email: req.body.email,
        password: req.body.password,
        avatar: files['avatar'] ? files['avatar'][0].filename : null,
        companyName: req.body.companyName,
        foundationYear: req.body.foundationYear,
        documents: files['document'] ? files['document'][0].filename : null,
        industry: req.body.industry,
        description: req.body.description,
        address: req.body.address,
        contacts: req.body.contacts,
        adminsComment: req.body.adminsComment,
      };

      const employer = await Employer.findByIdAndUpdate(employerId, updateData, { new: true });

      if (!employer) {
        return res.status(404).send({ message: 'Employer not found!' });
      }

      await transporter.sendMail({
        from: '04072002mu@gmail.com',
        to: req.body.email,
        subject: 'Employer details updated',
        text: `${req.body.email}, your employer details have been updated!`,
      });

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
    res.send({ message: 'Employer deleted!' });
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
      return res.status(422).send({ error: 'Email and password not correct!' });
    }

    const isMatch = await employer.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Email and password not correct!' });
    }

    employer.generateToken();
    await employer.save();

    return res.send({ message: 'Email and password are correct!', employer });
  } catch (error) {
    return next(error);
  }
});

export default employerRouter;
