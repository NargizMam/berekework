import mongoose, { Schema } from "mongoose";

const mainContainerCardModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  URLpath: String,
  image: String,
  icon: String,
});

const mainContainerCard = mongoose.model('MainContainerCard', mainContainerCardModel);
export default mainContainerCard;