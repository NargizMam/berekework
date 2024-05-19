import {Router} from 'express';
import mongoose from 'mongoose';
import {multiUpload} from '../multer';
import {UploadedFiles} from '../types';
import Employer from "../models/employer/employerModel";

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
          avatar: files['avatar'] ? files['avatar'][0].filename : null,
          companyName: req.body.companyName,
          industry: req.body.industry,
          description: req.body.description,
          address: req.body.address,
          contacts: req.body.contacts,
          documents: files['document'] ? files['document'][0].filename : null,
          logo: files['logo'] ? files['logo'][0].filename : null,
          foundationYear: req.body.foundationYear,
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
