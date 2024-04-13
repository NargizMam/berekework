import { model, Schema } from 'mongoose';

const ChooseSpecialistBlockSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  link: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const ChooseSpecialistBlock = model('ChooseSpecialistBlock', ChooseSpecialistBlockSchema );

export default ChooseSpecialistBlock;
