import mongoose from 'mongoose';

const headingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  /*button: {
    url: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },*/
}, {versionKey: false});

const Heading = mongoose.model('Heading', headingSchema);
export default Heading;
