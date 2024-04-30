// Header Admin interface
export interface HeaderMutation {
  logo: File | null | string;
  name: string;
  url: string;
  navbarItems: NavbarItemMutation[];
}

export interface NavbarItemMutation {
  nameNav: string;
  link: string;
  isDrop: boolean;
  nestedMenu: NestedMenuMutation[];
}

export interface NestedMenuMutation {
  nestedNameNav: string;
  nestedLink: string;
}

export interface IHeader {
  _id: string;
  logo: string;
  name: string;
  url: string;
  navbarItems: {
    nameNav: string;
    link: string;
    isDrop: boolean;
    nestedMenu: {
      nestedNameNav: string;
      nestedLink: string;
    }[];
  }[];
}

export interface Components {
  id: string;
  image: string;
  name: string;
  displayName: string;
  fields: {
    [key: string]: {
      type: string;
      fieldName: string;
      value: string | File;
      typeField: string;
      required: boolean;
      placeholder: string;
    };
  };
}
export interface Field {
  type: string;
  typeField: string;
  fieldName: string;
  value: string | File;
  required: boolean;
  placeholder: string;
}

export interface IPage {
  nameComponent: string;
  content: { [key: string]: string | File };
}

export interface CreatePage {
  name: string;
  url: string;
  blocks: IPage[];
}

export interface VacancyCardApiData {
  _id: string;
  title: string;
  description?: string;
  logo?: string;
  company: string;
  city: string;
  salary?: {
    min?: number;
    max?: number;
  };
  url: string;
}

export interface VacancyBlockApiData {
  _id: string;
  title: string;
  button: {
    url: string;
    text: string;
  };
  location: string;
}

export interface ILinks {
  url: string,
  text: string,
}

export interface IFooter {
  footerLinks: {
    title: string;
    links: ILinks[],
  },
  logo: File | null;
  socialNetworks: {
    title: string,
    socialNetworkArr: [{
      name: string,
      url: string,
      icon: string;
    }]
  },
  contactDetails: {
    title: string,
    contactsDetailsArr: [{
      text: string,
    }]
  },
  copyright: string,
}

