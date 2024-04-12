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
  companyLogo: {
    type: String
  },
  companyName: {
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
