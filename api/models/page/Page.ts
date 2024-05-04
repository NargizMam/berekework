import mongoose, { model, Schema } from 'mongoose';

const PageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    components: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'componentType',
        required: true,
      },
    ],
    componentType: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

const Page = model('Page', PageSchema);

export default Page;
