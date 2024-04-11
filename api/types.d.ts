export interface mainCardContainerType {
  _id: string;
  title: string;
  text: string;
  image: string | null;
  icon: string | null;
  URLpath: string | null;
}

export type mainCardContainerTypeWithoutId = Omit<mainCardContainerType, '_id'>
  
export interface NavbarItemFields {
  nameNav: string;
  link: string;
  isDrop: boolean;
  access: string;
  nestedMenu: [
    {
      nestedNameNav: string;
      nestedLink: string;
    },
  ];
}
