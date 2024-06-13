import { Employer } from '../admin/page/employerPanel/model/types';

export interface VacancyApiData {
  _id: string;
  city: string;
  vacancyTitle: string;
  company: string;
  logo: string;
  salary: {
    minSalary: number;
    maxSalary: number;
  };
  aboutVacancy?: string;
  responsibilities?: string;
  workConditions?: string;
  country?: string;
  fieldOfWork?: string;
  age: {
    minAge: number;
    maxAge: number;
  };
  education?: string;
  employmentType?: string;
  employer: Employer;
  createdAt: string;
  updatedAt: string;
}

export interface VacancyResponseToCard {
  _id: string;
  city: string;
  vacancyTitle: string;
  salary: {
    minSalary: string;
    maxSalary: string;
  };
  employer: {
    avatar: string;
    companyName: string;
  };
}

export interface VacancyCategoryGet {
  [key: string]: string[];
}

export interface CategoryVacancyI {
  id: string;
  title: string;
  name: string;
  values: { id: string; value: string; valueSend: string }[];
  input?: {
    isInput: boolean;
    placeholder: string;
  };
}

export interface User {
  _id: string;
  email: string;
  role: string;
  // avatar: File | string | null;
  avatar: string | null;
  name?: string;
  surname?: string;
  patronymic?: string;
  gender?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  education?: string;
  aboutMe?: string;
  workExperience: {
    _id: string;
    fieldOfWork: string;
    duration: string;
  }[];
  preferredJob?: string;
  preferredCity?: string;
  contacts?: {
    phone?: string;
    whatsapp?: string;
    telegram?: string;
  };
  documents?: string[];
}

export interface StatusHistory {
  status: string;
  changedBy: 'employer' | 'user';
  changedAt: Date;
}

export interface EmployerCompanyName {
  _id: string;
  companyName: string;
}

export interface ApplicationByVacancy {
  _id: string;
  vacancy: {
    _id: string;
    vacancyTitle: string;
    employer: EmployerCompanyName;
  };
  user: {
    _id: string;
    email: string;
  };
  userStatus: string;
  employerStatus: string;
  createdBy: 'employer' | 'user';
  isDeletedByEmployer: boolean;
  isDeletedByUser: boolean;
  statusHistory: StatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}