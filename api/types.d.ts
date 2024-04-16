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

export interface VacancyApi {
  _id: string;
  title: string;
  description: string;
  logo: string | null;
  company: string;
  city: string;
  salary: {
    min: number | null;
    max: number | null;
  };
  url: string;
}

export type VacancyMutation = Omit<VacancyApi, '_id'>;

export interface VacanciesBlockApi {
  _id: string;
  title: string;
  button: {
    url: string;
    text: string;
  };
  location: string;
}

export type VacanciesBlockMutation = Omit<VacanciesBlockApi, '_id'>;
