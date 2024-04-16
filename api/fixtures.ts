import mongoose from 'mongoose';
import config from './config';
import Vacancy from './models/Vacancy';
import VacanciesBlock from './models/VacanciesBlock';
import Components from './models/componentsModel';


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
  
  const collections = ['components', 'headings', 'vacanciesblocks', 'vacancies'];
    
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
      url: '/vacancies/661e0cb0e8cad5763f269346',
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
      url: '/vacancies/661e0cb0e8cad5763f269347',
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
      url: '/vacancies/661e0cb0e8cad5763f269348',
    },
    {
      logo: 'fixtures/logo_company_laboratory.png',
      title: 'Аналитик данных',
      company: 'Интелмед',
      city: 'Бишкек',
      salary: 'з/п не указана',
      url: '/vacancies/661e0cb0e8cad5763f269349',
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
      url: '/vacancies/661e0cb0e8cad5763f26934a',
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
      url: '/vacancies/661e0cb0e8cad5763f26934b',
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

  await db.close();
};

void run();
