import {EmployerFields} from '../../types';
import mongoose from "mongoose";


const employerSchema = new mongoose.Schema<EmployerFields>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contacts: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  documents: [{
    type: String,
    required: true,
  }],
  vacancies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vacancy',
    },
  ],
});

const Employer = mongoose.model<EmployerFields>('Employer', employerSchema);
export default Employer;
