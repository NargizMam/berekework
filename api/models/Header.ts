import { model, Schema } from 'mongoose';

const HeaderSchema = new Schema({
  logo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  navbarItems: [{ type: Schema.Types.ObjectId, ref: 'NavbarItem' }],
});

const Header = model('Header', HeaderSchema);
export default Header;
