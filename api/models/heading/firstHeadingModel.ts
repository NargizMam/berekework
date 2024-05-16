import mongoose from 'mongoose';

const firstHeadingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    buttonUrl: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const FirstHeading = mongoose.model('FirstHeading', firstHeadingSchema);
export default FirstHeading;
