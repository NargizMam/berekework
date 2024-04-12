export interface Vacancy {
  _id: string
  title: string;
  description: string;
  companyLogo: string | null;
  companyName: string;
  city: string;
  salaryMin: number | null;
  salaryMax: number | null;
}

export type VacancyMutation = Omit<Vacancy, '_id'>;



