import { Employer } from '../../../../admin/page/employerPanel/model/types';

export interface ICreateVacancyForm {
  vacancyTitle: string;
  aboutVacancy: string;
  responsibilities: string;
  workConditions: string;
  country: string;
  city: string;
  fieldOfWork: string;
  minAge: string;
  maxAge: string;
  minSalary: string;
  maxSalary: string;
  education: srring;
  employmentType: string;
  employer: string;
}

export interface Country {
  name: string;
  cities: string[];
}

export interface ApiAnswer {
  items: Country[];
}

export interface Vacancy {
  vacancyTitle: string;
  aboutVacancy: string;
  responsibilities: string;
  workConditions: string;
  country: string;
  city: string;
  fieldOfWork: string;
  salary: {
    minSalary: number;
    maxSalary: number;
  };
  age: {
    minAge: number;
    maxAge: number;
  };
  education: srring;
  employmentType: string;
  employer: Employer;
}

export interface VacancyWithId {
  _id: string;
  vacancyTitle: string;
  aboutVacancy: string;
  responsibilities: string;
  workConditions: string;
  country: string;
  city: string;
  fieldOfWork: string;
  salary: {
    minSalary: number;
    maxSalary: number;
  };
  age: {
    minAge: number;
    maxAge: number;
  };
  education: srring;
  employmentType: string;
  employer: string | undefined;
}

export interface VacancyEdtiData {
  id: string;
  vacancy: Vacancy;
}
