import mongoose, { Schema } from 'mongoose';

interface ComponentField {
  fieldName: string;
  value: string;
  typeField: string;
  required: boolean;
  placeholder: string;
}

interface Component {
  nameModel: string;
  displayName: string;
  image: string;
  fields: { [key: string]: ComponentField };
}

const componentFieldSchema = new Schema<ComponentField>({
  fieldName: { type: String, required: true },
  value: { type: String, default: '' },
  typeField: { type: String, required: true },
  required: { type: Boolean, required: true },
  placeholder: { type: String, required: true },
});

const componentsSchema = new mongoose.Schema({
  nameModel: { // Название модели в БД
    type: String,
    required: true,
  },
  displayName: { // Название которая будет видеть админ при создание page
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'Some url to image',
  },
  fields: { type: Map, of: componentFieldSchema },
});

const ComponentModel = mongoose.model<Component & Document>('ComponentModel', componentsSchema);
export default ComponentModel;
