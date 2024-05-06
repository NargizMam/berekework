import { Router, Request, Response, NextFunction } from 'express';
import employeesCard from '../models/employeesCard/employeesCardModel';
import { employeesUpload } from '../multer';
import { EmployeesDataType } from '../types';
import mongoose from 'mongoose';

const employeesCardRouter = Router();

employeesCardRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await employeesCard.find();

    return res.send(results);
  } catch (error) {
    next(error);
  }
});

employeesCardRouter.post(
  '/',
  employeesUpload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    const employeePhoto = req.file;
    const { name, profession, age, country, city, education, experience } = req.body;

    try {
      const employeeData: EmployeesDataType = {
        name: name,
        photo: employeePhoto?.filename,
        profession: profession,
        age: age,
        country: country,
        city: city,
        education: education,
        experience: experience,
      };

      const employee = new employeesCard(employeeData);
      await employee.save();

      return res.send({ message: 'created', employee });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }

      next(error);
    }
  },
);

export default employeesCardRouter;
