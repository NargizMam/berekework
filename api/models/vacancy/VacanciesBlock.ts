import { model, Schema } from 'mongoose';

const VacanciesBlockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    button: {
      url: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const VacanciesBlock = model('VacanciesBlock', VacanciesBlockSchema);

export default VacanciesBlock;
