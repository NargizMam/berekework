export interface VacancyBlockApiData {
  _id: string;
  title: string;
  button: {
    url: string;
    text: string;
  };
  location: string;
}

export interface VacancyCardApiData {
  _id: string;
  vacancyTitle: string;
  description?: string;
  logoCompany?: string;
  nameCompany: string;
  country?: string;
  city: string;
  salary?: {
    minSalary?: number;
    maxSalary?: number;
  };
  aboutVacancy?: string;
  responsibilities?: string;
  workConditions?: string;
  fieldOfWork?: string;
  age?: {
    minAge?: number;
    maxAge?: number;
  };
  education?: string;
  employmentType?: string;
  employer: string;
}
