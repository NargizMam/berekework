import { Router } from 'express';
import mongoose from 'mongoose';
import Employer from '../models/employer/employerModel';
import { multiUpload } from '../multer';
import { UploadedFiles } from '../types';

const employerRouter = Router();

employerRouter.post(
  '/',
  multiUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const files: UploadedFiles = req.files as UploadedFiles;
      const employer = new Employer({
        email: req.body.email,
        password: req.body.password,
        companyName: req.body.companyName,
        action: req.body.action,
        scope: req.body.scope,
        foundationYear: req.body.foundationYear,
        avatar: files['avatar'] ? files['avatar'][0].filename : null,
        address: req.body.address,
        document: files['document'] ? files['document'][0].filename : null,
      });
      employer.generateToken();
      await employer.save();
      return res.send({ message: 'Employer is ready!', employer });
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
    const results = await Employer.findById(req.params.id).populate('vacancies');
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

export default employerRouter;
