import { Schema, model } from "mongoose";

const GalleryVideoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  video: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedDate: {
    type: Date,
  }
});

const GalleryVideo = model('GalleryVideo', GalleryVideoSchema);
export default GalleryVideo;

