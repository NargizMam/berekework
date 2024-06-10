import { VacancyCardApiData } from './shared/types';

export interface Header {
  logo: string;
  name: string;
  url: string;
  navbarItems: [
    {
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
    },
  ];
}
export interface ModeratorApi {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerInfoApi {
  _id: string;
  email: string;
  password: string;
  companyName: string;
  industry: string;
  description: string;
  address: string;
  contacts: string;
  avatar: File | string | null;
  document: string | null;
  foundationYear: string;
  vacancies: VacancyCardApiData[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export interface EmployerProfileMutation {
  _id: string;
  companyName: string;
  industry: string;
  description: string;
  address: string;
  contacts: string;
  logo: File | string | null;
  document: string | null;
  foundationYear: string;
}
export interface Moderator {
  name: string;
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}
