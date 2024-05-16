import { VacancyCardApiData } from './shared/types';

export interface Header {
  logo: string,
  name: string,
  url: string,
  navbarItems: [{
    nameNav: string,
    link: string,
    isDrop: boolean,
    access: string,
    nestedMenu: [{
      nestedNameNav: string,
      nestedLink: string,
    }]
  }]
}
export interface ModeratorApi{
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
export interface EmployerInfoApi{
  _id: string;
  companyName: string;
  industry: string;
  description: string;
  address: string;
  contacts: string;
  logo: string;
  documents: string;
  vacancies: VacancyCardApiData[];
  createdAt: string;
  updatedAt: string;
}
export interface Moderator{
  name: string;
  email: string;
  password: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

