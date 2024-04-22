import mongoose from 'mongoose';

const tariffSchema = new mongoose.Schema({
  commonTitle: {
    type: String,
    default: 'Tariff',
    immutable: true,
  },
  title: {
    type: String,
    default: 'Tariff',
    immutable: true,
  },
  description: {
    type: [String],
    default: ['Basic stuff'],
    immutable: true,
  },
});

export const Tariff = mongoose.model('Tariff', tariffSchema);
export default Tariff;
