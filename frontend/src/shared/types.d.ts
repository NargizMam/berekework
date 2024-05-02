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