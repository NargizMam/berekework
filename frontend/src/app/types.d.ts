import { Employer } from '../admin/page/employerPanel/model/types';

export interface VacancyCardApiData {
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
  employer?: Employer;
  createdAt: string;
}