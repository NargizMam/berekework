import mongoose from 'mongoose';
import config from './config';
import Vacancy from './models/vacancy/Vacancy';
import VacanciesBlock from './models/vacancy/VacanciesBlock';
import User from './models/users/userModel';
import { randomUUID } from 'crypto';
import Tariff from './models/tariff/tarrifModel';
import LastNewsBlock from './models/lastNews/LastNewsBlock';
import Employer from './models/employer/employerModel';
import mainContainerCard from './models/mainContainerCard/mainContainerCardModel';

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
    'maincontainercards',
  ];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  
  
  
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

  await Tariff.create({
    mainTitle: 'Tariff',
    title: 'Basic',
    description: ['Free Food', 'Apple Music'],
  });

 const [employer1, employer2, employer3] = await Employer.create(
    {
      email: 'employer1@example.com',
      password: 'password123',
      token: randomUUID(),
      role: 'employer',
      companyName: 'Company A',
      industry: 'Technology',
      description: 'Company A is a leading technology firm specializing in software development.',
      address: '123 Main St, City, Country',
      contacts: '+1 (123) 456-7890',
      logo: 'fixtures/logo_company_megaservice.png',
      documents: 'fixtures/dummy.pdf',
    },
    {
      email: 'employer2@example.com',
      password: 'password456',
      token: randomUUID(),
      role: 'employer',
      companyName: 'Company B',
      industry: 'Finance',
      description: 'Company B is a financial services company providing investment solutions.',
      address: '456 Elm St, City, Country',
      contacts: '+1 (234) 567-8901',
      logo: 'fixtures/logo_company_megaservice.png',
      documents: 'https://example.com/documentsB.pdf',
    },
    {
      email: 'employer3@example.com',
      password: 'password789',
      token: randomUUID(),
      role: 'employer',
      companyName: 'Company C',
      industry: 'Healthcare',
      description: 'Company C is a healthcare organization committed to improving patient care.',
      address: '789 Oak St, City, Country',
      contacts: ' +1 (345) 678-9012',
      logo: 'fixtures/logo_company_megaservice.png',
      documents: 'https://example.com/documentsC.pdf',
    },
  );

  await Vacancy.create(
    {
      title: 'Менеджер по продажам услуг',
      city: 'Бишкек',
      salary: {
        min: 25000,
        max: 35000,
      },
      url: '/vacancies',
      employer: employer1.id,
    },
    {
      title: 'Менеджер по продажам услуг',
      city: 'Бишкек',
      salary: {
        min: 25000,
        max: 35000,
      },
      url: '/vacancies',
      employer: employer1.id,
    },
    {
      title: 'Менеджер по продажам услуг',
      city: 'Бишкек',
      salary: {
        min: 25000,
        max: 35000,
      },
      url: '/vacancies',
      employer: employer1.id,
    },
    {
      title: 'Аналитик данных',
      city: 'Бишкек',
      salary: 'з/п не указана',
      url: '/vacancies',
      employer: employer2.id,
    },
    {
      title: 'Инженер по ремонту компьютерной техники',
      city: 'Бишкек',
      salary: {
        min: 25000,
        max: 40000,
      },
      url: '/vacancies',
      employer: employer2.id,
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
      employer: employer3.id,
    },
  );

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
        cardTitle: 'Новые технологии в медицине',
        cardText: 'Искусственный интеллект, биотехнологии и перспективы лечения заболеваний',
        dateTime: '2024-04-21T12:00:00Z',
        buttonUrl: '/medical-technologies',
      },
    ],
  });

  await mainContainerCard.create([
    {
      title: 'Вакансии за рубежом',
      text: 'Ищете работу за границей? У нас есть вакансии! Присоединяйтесь и найдите свою международную возможность!',
      image: '/fixtures/image_maincard_suitcase.png',
      // icon: '/fixtures/icon_maincard_key.png',
      URLpath: '#',
    },
    {
      title: 'Вакансии в Кыргызстане',
      text: 'Ищете работу? У нас есть вакансии в Кыргызстане для вас! Присоединяйтесь к нам и найдите свою идеальную позицию!',
      image: '/fixtures/image_maincard_folder.png',
      // icon: '/fixtures/icon_maincard_clock.png',
      URLpath: '#',
    },
  ]);

  await db.close();
};
void run();
