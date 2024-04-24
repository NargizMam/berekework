import mongoose from 'mongoose';

const tariffSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
});

export const Tariff = mongoose.model('Tariff', tariffSchema);
export default Tariff;
