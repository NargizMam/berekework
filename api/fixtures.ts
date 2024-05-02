import mongoose from 'mongoose';
import config from './config';
import Vacancy from './models/vacancy/Vacancy';
import VacanciesBlock from './models/vacancy/VacanciesBlock';
import User from './models/users/userModel';
import { randomUUID } from 'crypto';
import Tariff from './models/tariff/tarrifModel';
import LastNewsBlock from './models/lastNews/LastNewsBlock';
import Employer from './models/employer/employerModel';

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

  const collections = [
    'components',
    'headings',
    'vacanciesblocks',
    'vacancies',
    'users',
    'employers',
    'tariffs',
    'lastnewsblocks',
  ];

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

  await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    token: randomUUID(),
    role: 'superadmin',
  });

  await Employer.create({
    email: 'employer@gmail.com',
    password: 'employer',
    token: randomUUID(),
    action: 'Game organization',
    foundationYear: '2012',
    scope: 'Major',
    companyName: 'NAVI',
    role: 'employer',
  });

  await Tariff.create({
    mainTitle: 'Tariff',
    title: 'Basic',
    description: ['Free Food', 'Apple Music'],
  });

  await LastNewsBlock.create({
    title: 'Последние новости',
    page: 'last-news-block',
    cards: [
      {
        cardTitle: 'Природные катастрофы угрожают',
        cardText: 'Извержения вулканов и землетрясения: что делать и как подготовиться?',
        dateTime: '2024-04-21T12:00:00Z',
        buttonUrl: '/natural-disasters',
      },
      {
        cardTitle: 'Рост напряженности на Украине',
        cardText: 'Международные обсуждения и реакции на политическую ситуацию',
        dateTime: '2024-04-21T12:00:00Z',
        buttonUrl: '/ukraine-tensions',
      },
      {
        cardTitle: 'Экономические прогнозы на следующий квартал',
        cardText: 'Какие изменения ожидаются в мировой экономике и на рынках?',
        dateTime: '2024-04-21T12:00:00Z',
        buttonUrl: '/economic-forecasts',
      },
      {
        email: 'moderator2@gmail.com',
        password: 'moderator2',
        token: randomUUID(),
        role: 'admin',
      },
    ],
  });

  await db.close();
};

void run();
