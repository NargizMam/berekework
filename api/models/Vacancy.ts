import { Schema, model } from 'mongoose';

const vacancySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  logo: {
    type: String,
  },
  company: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  salary: {
    min: Number,
    max: Number,
  },
}, { timestamps: true });

const Vacancy = model('Vacancy', vacancySchema);

export default Vacancy;
