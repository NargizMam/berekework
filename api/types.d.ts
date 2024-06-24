import { Document, Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';

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
  displayName: string;
  googleID?: string;
  avatar?: string;
  name?: string;
  surname?: string;
  patronymic?: string;
  gender?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  education?: string;
  aboutMe?: string;
  workExperience?: {
    fieldOfWork: string;
    duration: string;
  };
  preferredJob?: string;
  mainDuration: string;
  preferredCity?: string;
  contacts?: {
    phone?: string;
    whatsapp?: string;
    telegram?: string;
  };
  documents?: string[] | null;
  otp?: string;
  isArchive: boolean;
}

export interface EmployerFields {
  email: string;
  password: string;
  token: string;
  role: string;
  isPublished: Boolean;
  googleID?: string;
  avatar?: string;
  companyName: string;
  industry: string;
  description: string;
  address: string;
  contacts: string;
  logo: string;
  documents: string;
  foundationYear: string;
  vacancies: Types.ObjectId[];
  adminsComment: string;
  isArchive: boolean;
  tariff: {
    data: Date;
    titleTariff: 'Нет тарифа'| 'Разовый' | 'Месячный' | 'Полугодовой';
  };
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

export interface EmployeesDataType {
  name: string;
  photo?: string;
  profession: string;
  age: number;
  country: string;
  city: string;
  education?: string;
  experience?: string;
}

export interface UploadedFiles {
  avatar?: Express.Multer.File[]; // Массив файлов для поля 'avatar'
  document?: Express.Multer.File[]; // Массив файлов для поля 'document'
  logo?: Express.Multer.File[]; // Массив файлов для поля 'logo'
}

export interface VacancyI {
  _id: ObjectId;
  vacancyTitle: string;
  salary: {
    minSalary: number;
    maxSalary: number;
  };
  country: string;
  city: string;
  aboutVacancy: string;
  responsibilities: string;
  workConditions: string;
  fieldOfWork: string;
  age: {
    minAge: number;
    maxAge: number;
  };
  education: string;
  employmentType: string;
}

export interface CategoryVacancy {
  [key: string]: string;
}
