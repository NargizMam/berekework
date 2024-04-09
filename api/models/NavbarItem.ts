import { model, Schema } from 'mongoose';

const NavbarItemSchema = new Schema({
  nameNav: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  },
  isDrop: {
    type: Boolean,
    default: false,
  },
  access: {
    type: String,
    enum: ['find_job', 'find_employee'],
    default: 'find_job',
  },
  nestedMenu: [
    {
      nestedNameNav: {
        type: String,
        unique: true,
      },
      nestedLink: {
        type: String,
      },
    },
  ],
});

const NavbarItem = model('NavbarItem', NavbarItemSchema);
export default NavbarItem;
