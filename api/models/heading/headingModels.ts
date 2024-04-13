import mongoose from 'mongoose';

const headingSchema = new mongoose.Schema({
  title: {
    element: {
      type: String,
      default: 'Title',
      immutable: true,
    },
    typeField: {
      type: String,
      default: 'text',
      immutable: true,
    },
  },
  location: {
    type: String,
    typeField: 'text',
  },
  image: {
    element: {
      type: String,
    },
    typeField: {
      type: String,
      default: 'file',
      immutable: true,
    },
  },
  description: {
    type: String,
    typeField: 'text',
  },
  button: {
    url: {
      type: String,
      typeField: 'text',
    },
    text: {
      type: String,
      typeField: 'text',
    },
  },
});

const Heading = mongoose.model('Heading', headingSchema);
export default Heading;
