import { Schema, model, Types } from 'mongoose';
import Vacancy from './Vacancy';

const VacancyBlockSchema = new Schema({
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
    required: true,
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Vacancy',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const vacancy = await Vacancy.findById(value);
        return Boolean(vacancy);
      },
      message: 'Vacancy card does not exist!',
    },
  }],
  location: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const VacancyBlock = model('VacancyBlock', VacancyBlockSchema);

export default VacancyBlock;





