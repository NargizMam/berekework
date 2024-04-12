export interface Vacancy {
  _id: string
  title: string;
  description: string;
  companyLogo?: string | null;
  companyName: string;
  city: string;
  salary?: number | string;
}

export interface VacancyMutation {
  title: string;
  description: string;
  companyLogo?: string | null;
  companyName: string;
  city: string;
  salary?: string | number;
}

export interface NavbarItemFields {
  nameNav: string;
  link: string;
  isDrop: boolean;
  access: string;
  nestedMenu: [
    {
      nestedNameNav: string;
      nestedLink: string;
    },
  ];
}
