import {Document, Model, Types} from 'mongoose';

export interface mainCardContainerType {
  _id: string;
  title: string;
  text: string;
  image: string | null;
  icon: string | null;
  URLpath: string | null;
}

export type mainCardContainerTypeWithoutId = Omit<mainCardContainerType, '_id'>;

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
export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  googleID?: string;
  avatar?: string;
}

export interface EmployerFields {
  email: string;
  password: string;
  token: string;
  role: string;
  googleID?: string;
  avatar?: string;
  scope: string;
  action: string;
  foundationYear: string;
  document: string;
  companyName: string;
  industry: string;
  description: string;
  address: string;
  contacts: string;
  logo: string;
  documents: string;
  vacancies: Types.ObjectId[];
}

export interface UserMethods {
  generateToken(): void;
  checkPassword(password: string): Promise<boolean>;
}

export type UserModel = Model<UserFields, unknown, UserMethods>;
export type EmployerModel = Model<EmployerFields, unknown, UserMethods>;

export interface VacancyApi {
  _id: string;
  title: string;
  description: string;
  city: string;
  salary: {
    min: number | null;
    max: number | null;
  };
  url: string;
  employer: Types.ObjectId;
}

export type VacancyMutation = Omit<VacancyApi, '_id'>;

export interface VacanciesBlockApi {
  _id: string;
  title: string;
  button: {
    url: string;
    text: string;
  };
  location: string;
}

export type VacanciesBlockMutation = Omit<VacanciesBlockApi, '_id'>;

// Header
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

//Admin page create

export interface Block {
  nameComponent: string;
  content: { [key: string]: string };
}
export interface ComponentModelType extends Document {
  title: string;
  description: string;
  image: string;
}

export interface Page {
  name: string;
  url: string;
  blocks: Block[];
}

export interface ModelType {
  [key: string]: any;
}

export interface UploadedFiles {
  avatar?: Express.Multer.File[]; // Массив файлов для поля 'avatar'
  document?: Express.Multer.File[]; // Массив файлов для поля 'document'
}
