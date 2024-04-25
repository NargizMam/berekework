import { model, Schema } from 'mongoose';

const footerLinkSchema = new Schema({
  title: { type: String, required: true },
  links: [{
    url: { type: String, required: true },
    text: { type: String, required: true },
  }],
});

const socialNetworkSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
});

const contactsDetailsSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  contactsDetailsArr: [{
    text: {
      required: true,
      type: String,
    },
  }],
})

const FooterSchema = new Schema({
  footerLinks: {
    type: [footerLinkSchema],
    validate: [arrayMinSize, 'At least one footer link is required']
  },
  logo: {
    type: String,
    required: true,
  },
  socialNetworks: {
    title: {
      type: String,
      required: true,
    },
    socialNetworksArr: [socialNetworkSchema]
  },
  contactDetails: {
    type: [contactsDetailsSchema],
    validate: [arrayMinSize, 'At least one contact detail is required']
  },
  copyright: {
    type: String,
    required: true,
  },
});

function arrayMinSize(arr: []) {
  return arr.length > 0;
}

const Footer = model('Footer', FooterSchema);
export default Footer;
