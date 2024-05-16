import mongoose from 'mongoose';

const employeesCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  profession: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  education: {
    type: String,
  },
  experience: {
    type: String,
  }
});

const employeesCard = mongoose.model('employeesCard', employeesCardSchema);
export default employeesCard;
