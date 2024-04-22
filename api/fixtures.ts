import mongoose from 'mongoose';
import config from './config';
import Vacancy from './models/Vacancy';
import VacanciesBlock from './models/VacanciesBlock';
import Components from './models/componentsModel';
import User from './models/users/userModel';
import { randomUUID } from 'crypto';
import Tariff from './models/tariff/tarrifModel';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['components', 'headings', 'vacanciesblocks', 'vacancies', 'users', 'tariffs'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await Vacancy.create(
    {
      logo: 'fixtures/logo_company_satcom.png',
      title: 'Менеджер по продажам услуг',
      company: 'Satcom',
      city: 'Бишкек',
      salary: {
        min: 25000,
        max: 35000,
      },
      url: '/vacancies',
    },
    {
      logo: 'fixtures/logo_company_interpost.png',
      title: 'Менеджер по продажам услуг',
      company: 'Satcom',
      city: 'Бишкек',
      salary: {
        min: 25000,
        max: 35000,
      },
      url: '/vacancies',
    },
    {
      logo: 'fixtures/logo_company_ect.png',
      title: 'Менеджер по продажам услуг',
      company: 'Satcom',
      city: 'Бишкек',
      salary: {
        min: 25000,
        max: 35000,
      },
      url: '/vacancies',
    },
    {
      logo: 'fixtures/logo_company_laboratory.png',
      title: 'Аналитик данных',
      company: 'Интелмед',
      city: 'Бишкек',
      salary: 'з/п не указана',
      url: '/vacancies',
    },
    {
      logo: 'fixtures/logo_company_megaservice.png',
      title: 'Инженер по ремонту компьютерной техники',
      company: 'Мега Сервис',
      city: 'Бишкек',
      salary: {
        min: 25000,
        max: 40000,
      },
      url: '/vacancies',
    },
    {
      logo: 'fixtures/logo_company_cambridge.png',
      title: 'Преподаватель английского языка',
      company: 'Cambridge School',
      city: 'Бишкек',
      salary: {
        min: 15000,
        max: 50000,
      },
      url: '/vacancies',
    },
  );

  await VacanciesBlock.create({
    title: 'Последние вакансии',
    button: {
      url: '/',
      text: 'Смотреть еще',
    },
    location: '/',
  });

  await Components.create({
    image: 'fixtures/crybaby.jpg',
    name: 'Heading',
    requestUrl: '/heading',
  });

  await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    token: randomUUID(),
    role: 'superadmin',
  });

  await Tariff.create({
    titleCommon: 'Tariff',
    title: 'Basic',
    description: ['Free Food', 'Apple Music'],
  });

  await db.close();
};

void run();
