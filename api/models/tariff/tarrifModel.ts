import mongoose from 'mongoose';

const tariffSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: [String],
  },
});

export const Tariff = mongoose.model('Tariff', tariffSchema);
export default Tariff;
