import mongoose from 'mongoose';

const componentsSchema = new mongoose.Schema({
  image: String,
  name: String,
  requestUrl: String,
});

const Components = mongoose.model('Components', componentsSchema);
export default Components;
