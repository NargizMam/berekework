import {model, Schema} from 'mongoose';

const vacancySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    salary: {
      min: Number,
      max: Number,
    },
    url: {
      type: String,
    },
  employer: {
      type: Schema.Types.ObjectId,
      ref: 'Employer',
      required: true,
  },
  },
  { timestamps: true },
);

const Vacancy = model('Vacancy', vacancySchema);

export default Vacancy;
