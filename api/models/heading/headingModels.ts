import mongoose from 'mongoose';

const headingSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  image: String,
  description: String,
  button: {
    url: String,
    text: String,
  },
});

const Heading = mongoose.model('Heading', headingSchema);
export default Heading;
