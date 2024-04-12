import { Schema, model } from "mongoose";

const vacancySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
 logo: {
    type: String
  },
 company: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  salaryMin: {
    type: Number
  },
  salaryMax: {
    type: Number
  }
}, { timestamps: true });

const Vacancy = model('Vacancy', vacancySchema);

export default Vacancy;
