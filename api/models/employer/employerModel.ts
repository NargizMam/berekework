import {EmployerFields, EmployerModel} from '../../types';
import mongoose, {Types} from "mongoose";


const employerSchema = new mongoose.Schema<EmployerFields>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contacts: {
    type: String,
    required: true
  },
  logo: {
    type: String,
  },
  documents: [{
    type: String,
  }],
  vacancies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vacancy'
    }
  ]

});

const Employer = mongoose.model<EmployerFields>('Employer', employerSchema);
export default Employer;
