import mongoose from 'mongoose';
import config from './config';
import Vacancy from './models/vacancy/Vacancy';
import { randomUUID } from 'crypto';
import Tariff from './models/tariff/tarrifModel';
import Employer from './models/employer/employerModel';
import mainContainerCard from './models/mainContainerCard/mainContainerCardModel';
import LastNewsBlock from './models/lastNews/LastNewsBlock';
import User from './models/users/userModel';

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

  // await VacanciesBlock.create({
  //   title: 'Последние вакансии',
  //   button: {
  //     url: '/',
  //     text: 'Смотреть еще',
  //   },
  //   location: '/',
  // });

  // Create users
  const [superadmin, user1, user2] = await User.create([
    {
      email: 'superadmin@example.com',
      password: 'password123',
      token: randomUUID(),
      role: 'superadmin',
    },
    {
      email: 'user1@example.com',
      password: 'password123',
      token: randomUUID(),
      role: 'user',
      avatar: '/fixtures/avatar.jpg',
      name: 'Арсен',
      surname: 'Белеков',
      patronymic: 'Кызаев',
      gender: 'male',
      dateOfBirth: '2006-10-03',
      country: 'Кыргызстан',
      city: 'Бишкек',
      education: 'Высшее',
      aboutMe:
        'Опытный графический дизайнер с креативным подходом к работе и отличными навыками работы в команде. Я имею более 5 лет опыта работы в различных проектах, включая разработку брендбуков, рекламных материалов и дизайна интерфейсов. Мои сильные стороны включают внимательность к деталям, умение работать в команде и быстро адаптироваться к изменениям.',
      workExperience: {
        fieldOfWork: 'Графический дизайн',
        duration: '5 лет',
      },
      preferredJob: 'Графический дизайнер',
      preferredCity: 'Бишкек',
      contacts: {
        phone: '+996123456789',
        whatsapp: '+996123456789',
        telegram: '@user1',
      },
    },
    {
      email: 'user2@example.com',
      password: 'password123',
      token: randomUUID(),
      role: 'user',
      avatar: '/fixtures/avatar.jpg',
      name: 'Иван',
      surname: 'Иванов',
      patronymic: 'Иванович',
      gender: 'male',
      dateOfBirth: '2000-05-15',
      country: 'Кыргызстан',
      city: 'Ош',
      education: 'Среднее',
      aboutMe:
        'Маркетолог с более чем 3-летним опытом работы в разработке стратегий и продвижении брендов. Специализируюсь на анализе рынка, планировании и реализации маркетинговых кампаний. Мои ключевые навыки включают стратегическое мышление, креативный подход к решению задач и отличные коммуникативные навыки. Я стремлюсь к постоянному развитию и улучшению своих профессиональных качеств.',
      workExperience: {
        fieldOfWork: 'Маркетинг',
        duration: '3 года',
      },
      preferredJob: 'Маркетолог',
      preferredCity: 'Ош',
      contacts: {
        phone: '+996987654321',
        whatsapp: '+996987654321',
        telegram: '@user2',
      },
    },
  ]);

  await Tariff.create({
    mainTitle: 'Tariff',
    title: 'Basic',
    description: ['Free Food', 'Apple Music'],
  });

  const [vac1, vac2, vac3, vac4, vac5, vac6] = await Vacancy.create(
    {
      vacancyTitle: 'Software Developer',
      salary: {
        minSalary: 50000,
        maxSalary: 80000,
      },
      city: 'Moscow',
      aboutVacancy:
        'We are looking for a talented Software Developer to join our team. The ideal candidate will have experience with full-stack development and a passion for technology. You will be responsible for developing and maintaining web applications.',
      responsibilities:
        'Develop and maintain web applications. Collaborate with cross-functional teams to define, design, and ship new features. Ensure the performance, quality, and responsiveness of applications. Identify and correct bottlenecks and fix bugs.',
      workConditions:
        'Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.',
      country: 'Russia',
      fieldOfWork: 'Information Technology',
      age: {
        minAge: 25,
        maxAge: 40,
      },
      education: 'Высшее',
      employmentType: 'Полная',
      employer: null, // Will be updated later
    },
    {
      vacancyTitle: 'Marketing Specialist',
      salary: {
        minSalary: 30000,
        maxSalary: 50000,
      },
      city: 'Saint Petersburg',
      aboutVacancy:
        'We are looking for a creative Marketing Specialist to help us grow our brand. The ideal candidate will have experience in digital marketing and a passion for brand development. You will be responsible for developing and executing marketing campaigns.',
      responsibilities:
        'Develop and execute marketing campaigns. Analyze market trends and customer behavior. Create content for social media and other marketing channels. Collaborate with the sales team to develop lead generation strategies.',
      workConditions:
        'Full-time position. Office-based role with occasional remote work options. Competitive salary and benefits.',
      country: 'Russia',
      fieldOfWork: 'Marketing',
      age: {
        minAge: 23,
        maxAge: 35,
      },
      education: 'Высшее',
      employmentType: 'Полная',
      employer: null, // Will be updated later
    },
    {
      vacancyTitle: 'Data Analyst',
      salary: {
        minSalary: 40000,
        maxSalary: 70000,
      },
      city: 'Kazan',
      aboutVacancy:
        'We are seeking a detail-oriented Data Analyst to join our team. The ideal candidate will have experience in data analysis and a strong analytical mindset. You will be responsible for analyzing large data sets to provide insights and recommendations.',
      responsibilities:
        'Analyze large data sets to provide insights and recommendations. Develop and maintain data dashboards. Collaborate with cross-functional teams to identify data needs. Present findings to stakeholders.',
      workConditions:
        'Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.',
      country: 'Russia',
      fieldOfWork: 'Data Analysis',
      age: {
        minAge: 27,
        maxAge: 45,
      },
      education: 'Высшее',
      employmentType: 'Полная',
      employer: null, // Will be updated later
    },
    {
      vacancyTitle: 'HR Manager',
      salary: {
        minSalary: 35000,
        maxSalary: 60000,
      },
      city: 'Novosibirsk',
      aboutVacancy:
        'We are looking for an experienced HR Manager to join our team. The ideal candidate will have experience in human resources and a passion for employee development. You will be responsible for managing HR functions and developing HR strategies.',
      responsibilities:
        'Manage HR functions. Develop and implement HR strategies. Oversee recruitment and onboarding processes. Ensure compliance with labor laws and regulations.',
      workConditions:
        'Full-time position. Office-based role with occasional remote work options. Competitive salary and benefits.',
      country: 'Russia',
      fieldOfWork: 'Human Resources',
      age: {
        minAge: 30,
        maxAge: 45,
      },
      education: 'Высшее',
      employmentType: 'Полная',
      employer: null, // Will be updated later
    },
    {
      vacancyTitle: 'Graphic Designer',
      salary: {
        minSalary: 30000,
        maxSalary: 50000,
      },
      city: 'Yekaterinburg',
      aboutVacancy:
        'We are seeking a creative Graphic Designer to join our team. The ideal candidate will have experience in graphic design and a strong portfolio. You will be responsible for creating visual content for various marketing materials.',
      responsibilities:
        'Create visual content for marketing materials. Develop and maintain brand guidelines. Collaborate with the marketing team to create engaging content. Ensure all designs are on-brand and visually appealing.',
      workConditions:
        'Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.',
      country: 'Russia',
      fieldOfWork: 'Design',
      age: {
        minAge: 22,
        maxAge: 35,
      },
      education: 'Средне-специальное',
      employmentType: 'Полная',
      employer: null, // Will be updated later
    },
    {
      vacancyTitle: 'Project Manager',
      salary: {
        minSalary: 45000,
        maxSalary: 75000,
      },
      city: 'Rostov-on-Don',
      aboutVacancy:
        'We are looking for an experienced Project Manager to join our team. The ideal candidate will have experience in project management and a strong organizational mindset. You will be responsible for overseeing projects from inception to completion.',
      responsibilities:
        'Oversee projects from inception to completion. Develop project plans and timelines. Coordinate with cross-functional teams. Ensure projects are completed on time and within budget.',
      workConditions:
        'Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.',
      country: 'Russia',
      fieldOfWork: 'Project Management',
      age: {
        minAge: 28,
        maxAge: 45,
      },
      education: 'Высшее',
      employmentType: 'Полная',
      employer: null, // Will be updated later
    },
  );

  // Create employers
  const [employer1, employer2] = await Employer.create(
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
      vacancies: [vac1._id, vac2._id, vac3._id],
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
      vacancies: [vac6._id, vac5._id, vac4._id],
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
      contacts: '+1 (345) 678-9012',
      logo: 'fixtures/logo_company_megaservice.png',
      documents: 'https://example.com/documentsC.pdf',
      vacancies: [],
    },
  );

  await Vacancy.updateMany({ _id: { $in: [vac1._id, vac2._id, vac3._id] } }, { employer: employer1._id });
  await Vacancy.updateMany({ _id: { $in: [vac4._id, vac5._id, vac6._id] } }, { employer: employer2._id });

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
