export interface VacancyCardApiData {
  _id: string;
  title: string;
  description?: string;
  logo?: string;
  company: string;
  city: string;
  salary?: {
    min?: number;
    max?: number;
  };
  url: string;
}

export interface VacancyBlockApiData {
  _id: string;
  title: string;
  button: {
    url: string;
    text: string;
  };
  location: string;
}
