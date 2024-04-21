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
    element: {
      type: String,
    },
    typeField: {
      type: String,
      default: 'text',
      immutable: true,
    },
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
    element: {
      type: String,
    },
    typeField: {
      type: String,
      default: 'text',
      immutable: true,
    },
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
