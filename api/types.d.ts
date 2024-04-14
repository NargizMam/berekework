export interface Vacancy {
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
}

export type VacancyMutation = Omit<Vacancy, '_id'>;

export interface VacanciesBlock {
  _id: string;
  title: string;
  cards: Vacancy[];
  button: {
    url: string;
    text: string;
  };
  location: string;
}

export type VacanciesBlockMutation = Omit<VacanciesBlock, '_id'>;



