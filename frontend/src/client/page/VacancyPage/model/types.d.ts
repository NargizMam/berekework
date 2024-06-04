export interface VacancyToCards {
  _id: string;
  city: string;
  vacancyTitle: string;
  employer: {
    logo: string;
    companyName: string;
  };
  salary: {
    minSalary: string;
    maxSalary: string;
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
