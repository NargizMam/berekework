import { Schema, model, Types } from 'mongoose';
import Vacancy from '../vacancy/Vacancy';

const applicationSchema = new Schema(
  {
    vacancy: {
      type: Schema.Types.ObjectId,
      ref: 'Vacancy',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => {
          const vacancy = await Vacancy.findById(value);
          return Boolean(vacancy);
        },
        message: 'Vacancy does not exist!',
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userStatus: {
      type: String,
      enum: ['На рассмотрение', 'Принят', 'Отклонен', 'Новая вакансия', 'Заинтересован'],
      default: 'На рассмотрение',
    },
    employerStatus: {
      type: String,
      enum: ['Новая заявка', 'Принят', 'Отклонен', 'Ожидание ответа', 'Заинтересован'],
      default: 'Новая заявка',
    },
  },
  { timestamps: true },
);

const Application = model('Application', applicationSchema);

export default Application;
