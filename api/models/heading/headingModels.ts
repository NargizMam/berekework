import mongoose from 'mongoose';

const headingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  button: {
    element: {
      type: String,
      default: 'button',
    },
    url: {
      type: String,
      typeField: {
        type: String,
        default: 'text',
        immutable: true,
      },
    },
    text: {
      type: String,
      typeField: {
        type: String,
        default: 'text',
        immutable: true,
      },
    },
  },
});

const Heading = mongoose.model('Heading', headingSchema);
export default Heading;
