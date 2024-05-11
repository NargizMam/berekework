import mongoose from 'mongoose';

const secondHeadingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const SecondHeading = mongoose.model('SecondHeading', secondHeadingSchema);
export default SecondHeading;
