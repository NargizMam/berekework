import mongoose from 'mongoose';

const headingSchema = new mongoose.Schema({
  title: {
    type: String,
    // typeField: {
    //   type: String,
    //   default: 'text',
    // },
    default: "{typeField: 'text'}",
  },
  location: {
    type: String,
    typeField: 'text',
  },
  image: {
    type: String,
    typeField: 'file',
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
