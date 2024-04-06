import mongoose from 'mongoose';

const headingSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  url: String,
  image: String,
  description: String,
});

const Heading = mongoose.model('Heading', headingSchema);
export default Heading;
