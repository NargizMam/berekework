import mongoose from 'mongoose';

const thirdHeadingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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

const ThirdHeading = mongoose.model('ThirdHeading', thirdHeadingSchema);
export default ThirdHeading;
