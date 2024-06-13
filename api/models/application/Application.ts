import { Schema, model, Types } from 'mongoose';
import Vacancy from '../vacancy/Vacancy';

const statusHistorySchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  changedBy: {
    type: String,
    enum: ['employer', 'user'],
    required: true,
  },
  changedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

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
      enum: ['На рассмотрении', 'Принят', 'Отклонен', 'Новая вакансия', 'Заинтересован'],
      default: 'На рассмотрении',
    },
    employerStatus: {
      type: String,
      enum: ['Новая заявка', 'Принят', 'Отклонен', 'Ожидание ответа', 'Заинтересован'],
      default: 'Новая заявка',
    },
    createdBy: {
      type: String,
      enum: ['employer', 'user'],
      required: true,
    },
    isDeletedByEmployer: {
      type: Boolean,
      default: false,
    },
    isDeletedByUser: {
      type: Boolean,
      default: false,
    },
    statusHistory: [statusHistorySchema],
  },
  { timestamps: true },
);

const Application = model('Application', applicationSchema);

export default Application;
