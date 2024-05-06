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
  },
  logo: {
    type: String,
  },
  socialNetworks: {
    title: {
      type: String,
    },
    socialNetworksArr: [socialNetworkSchema]
  },
  contactDetails: {
    type: [contactsDetailsSchema],
  },
  copyright: {
    type: String,
  },
});


const Footer = model('Footer', FooterSchema);
export default Footer;
