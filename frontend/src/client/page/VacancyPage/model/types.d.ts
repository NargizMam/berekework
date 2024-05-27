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
