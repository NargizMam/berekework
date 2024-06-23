import { getAllVacancy } from '../vacancyThunk';
import axiosApi from '../../../app/axiosApi';
import { configureStore } from '@reduxjs/toolkit';
import { vacancyReducer } from '../vacancySlice';

jest.mock('../../../app/axiosApi', () => ({
  get: jest.fn(),
}));
const mockedAxiosApi = axiosApi as jest.Mocked<typeof axiosApi>;

const mockVacancies = [
  {
    salary: {
      minSalary: 50000,
      maxSalary: 80000,
    },
    age: {
      minAge: 25,
      maxAge: 40,
    },
    _id: '667839d2b05a4b118a1e4e9f',
    vacancyTitle: 'Software Developer',
    city: 'Moscow',
    aboutVacancy:
      'We are looking for a talented Software Developer to join our team. The ideal candidate will have experience with full-stack development and a passion for technology. You will be responsible for developing and maintaining web applications.',
    responsibilities:
      'Develop and maintain web applications. Collaborate with cross-functional teams to define, design, and ship new features. Ensure the performance, quality, and responsiveness of applications. Identify and correct bottlenecks and fix bugs.',
    workConditions:
      'Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.',
    country: 'Russia',
    fieldOfWork: 'Information Technology',
    education: 'Высшее',
    employmentType: 'Полная',
    employer: {
      tariff: {
        titleTariff: 'Разовый',
      },
      _id: '667839d2b05a4b118a1e4eaf',
      email: 'muradil.koychubekob@gmail.com',
      token: 'fa0c1470-b06b-40a7-8d38-eb60d50bf92e',
      companyName: 'Company A',
      industry: 'Technology',
      description: 'Company A is a leading technology firm specializing in software development.',
      address: '123 Main St, City, Country',
      contacts: '+1 (123) 456-7890',
      documents: 'fixtures/dummy.pdf',
      foundationYear: '2020',
      role: 'employer',
      isPublished: true,
      avatar: 'fixtures/logo_company_megaservice.png',
      vacancies: [
        '667839d2b05a4b118a1e4e9f',
        '667839d2b05a4b118a1e4ea0',
        '667839d2b05a4b118a1e4ea1',
        '667839d2b05a4b118a1e4ea5',
      ],
      isArchive: false,
      createdAt: '2024-06-23T15:05:54.523Z',
      updatedAt: '2024-06-23T15:05:54.523Z',
      __v: 0,
    },
    archive: false,
    createdAt: '2024-06-23T15:05:54.186Z',
    updatedAt: '2024-06-23T15:05:54.720Z',
    __v: 0,
  },
  {
    salary: {
      minSalary: 40000,
      maxSalary: 70000,
    },
    age: {
      minAge: 27,
      maxAge: 45,
    },
    _id: '667839d2b05a4b118a1e4ea1',
    vacancyTitle: 'Data Analyst',
    city: 'Kazan',
    aboutVacancy:
      'We are seeking a detail-oriented Data Analyst to join our team. The ideal candidate will have experience in data analysis and a strong analytical mindset. You will be responsible for analyzing large data sets to provide insights and recommendations.',
    responsibilities:
      'Analyze large data sets to provide insights and recommendations. Develop and maintain data dashboards. Collaborate with cross-functional teams to identify data needs. Present findings to stakeholders.',
    workConditions:
      'Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.',
    country: 'Russia',
    fieldOfWork: 'Data Analysis',
    education: 'Высшее',
    employmentType: 'Полная',
    employer: {
      tariff: {
        titleTariff: 'Разовый',
      },
      _id: '667839d2b05a4b118a1e4eaf',
      email: 'muradil.koychubekob@gmail.com',
      token: 'fa0c1470-b06b-40a7-8d38-eb60d50bf92e',
      companyName: 'Company A',
      industry: 'Technology',
      description: 'Company A is a leading technology firm specializing in software development.',
      address: '123 Main St, City, Country',
      contacts: '+1 (123) 456-7890',
      documents: 'fixtures/dummy.pdf',
      foundationYear: '2020',
      role: 'employer',
      isPublished: true,
      avatar: 'fixtures/logo_company_megaservice.png',
      vacancies: [
        '667839d2b05a4b118a1e4e9f',
        '667839d2b05a4b118a1e4ea0',
        '667839d2b05a4b118a1e4ea1',
        '667839d2b05a4b118a1e4ea5',
      ],
      isArchive: false,
      createdAt: '2024-06-23T15:05:54.523Z',
      updatedAt: '2024-06-23T15:05:54.523Z',
      __v: 0,
    },
    archive: false,
    createdAt: '2024-06-23T15:05:54.186Z',
    updatedAt: '2024-06-23T15:05:54.720Z',
    __v: 0,
  },
  {
    salary: {
      minSalary: 35000,
      maxSalary: 60000,
    },
    age: {
      minAge: 30,
      maxAge: 45,
    },
    _id: '667839d2b05a4b118a1e4ea2',
    vacancyTitle: 'HR Manager',
    city: 'Novosibirsk',
    aboutVacancy:
      'We are looking for an experienced HR Manager to join our team. The ideal candidate will have experience in human resources and a passion for employee development. You will be responsible for managing HR functions and developing HR strategies.',
    responsibilities:
      'Manage HR functions. Develop and implement HR strategies. Oversee recruitment and onboarding processes. Ensure compliance with labor laws and regulations.',
    workConditions:
      'Full-time position. Office-based role with occasional remote work options. Competitive salary and benefits.',
    country: 'Russia',
    fieldOfWork: 'Human Resources',
    education: 'Высшее',
    employmentType: 'Полная',
    employer: {
      tariff: {
        titleTariff: 'Разовый',
      },
      _id: '667839d2b05a4b118a1e4eb0',
      email: 'employer2@example.com',
      token: '648ed3e8-879d-4b29-9353-b683f5013682',
      companyName: 'Company B',
      industry: 'Finance',
      description: 'Company B is a financial services company providing investment solutions.',
      address: '456 Elm St, City, Country',
      contacts: '+1 (234) 567-8901',
      documents: 'fixtures/dummy.pdf',
      foundationYear: '2019',
      role: 'employer',
      isPublished: true,
      avatar: 'fixtures/logo_company_megaservice.png',
      vacancies: [
        '667839d2b05a4b118a1e4ea6',
        '667839d2b05a4b118a1e4ea4',
        '667839d2b05a4b118a1e4ea3',
        '667839d2b05a4b118a1e4ea2',
      ],
      isArchive: false,
      createdAt: '2024-06-23T15:05:54.522Z',
      updatedAt: '2024-06-23T15:05:54.522Z',
      __v: 0,
    },
    archive: false,
    createdAt: '2024-06-23T15:05:54.186Z',
    updatedAt: '2024-06-23T15:05:54.728Z',
    __v: 0,
  },
  {
    salary: {
      minSalary: 30000,
      maxSalary: 50000,
    },
    age: {
      minAge: 23,
      maxAge: 35,
    },
    _id: '667839d2b05a4b118a1e4ea0',
    vacancyTitle: 'Marketing Specialist',
    city: 'Saint Petersburg',
    aboutVacancy:
      'We are looking for a creative Marketing Specialist to help us grow our brand. The ideal candidate will have experience in digital marketing and a passion for brand development. You will be responsible for developing and executing marketing campaigns.',
    responsibilities:
      'Develop and execute marketing campaigns. Analyze market trends and customer behavior. Create content for social media and other marketing channels. Collaborate with the sales team to develop lead generation strategies.',
    workConditions:
      'Full-time position. Office-based role with occasional remote work options. Competitive salary and benefits.',
    country: 'Russia',
    fieldOfWork: 'Marketing',
    education: 'Высшее',
    employmentType: 'Полная',
    employer: {
      tariff: {
        titleTariff: 'Разовый',
      },
      _id: '667839d2b05a4b118a1e4eaf',
      email: 'muradil.koychubekob@gmail.com',
      token: 'fa0c1470-b06b-40a7-8d38-eb60d50bf92e',
      companyName: 'Company A',
      industry: 'Technology',
      description: 'Company A is a leading technology firm specializing in software development.',
      address: '123 Main St, City, Country',
      contacts: '+1 (123) 456-7890',
      documents: 'fixtures/dummy.pdf',
      foundationYear: '2020',
      role: 'employer',
      isPublished: true,
      avatar: 'fixtures/logo_company_megaservice.png',
      vacancies: [
        '667839d2b05a4b118a1e4e9f',
        '667839d2b05a4b118a1e4ea0',
        '667839d2b05a4b118a1e4ea1',
        '667839d2b05a4b118a1e4ea5',
      ],
      isArchive: false,
      createdAt: '2024-06-23T15:05:54.523Z',
      updatedAt: '2024-06-23T15:05:54.523Z',
      __v: 0,
    },
    archive: false,
    createdAt: '2024-06-23T15:05:54.186Z',
    updatedAt: '2024-06-23T15:05:54.720Z',
    __v: 0,
  },
  {
    salary: {
      minSalary: 30000,
      maxSalary: 50000,
    },
    age: {
      minAge: 22,
      maxAge: 35,
    },
    _id: '667839d2b05a4b118a1e4ea3',
    vacancyTitle: 'Graphic Designer',
    city: 'Yekaterinburg',
    aboutVacancy:
      'We are seeking a creative Graphic Designer to join our team. The ideal candidate will have experience in graphic design and a strong portfolio. You will be responsible for creating visual content for various marketing materials.',
    responsibilities:
      'Create visual content for marketing materials. Develop and maintain brand guidelines. Collaborate with the marketing team to create engaging content. Ensure all designs are on-brand and visually appealing.',
    workConditions:
      'Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.',
    country: 'Russia',
    fieldOfWork: 'Design',
    education: 'Средне-специальное',
    employmentType: 'Полная',
    employer: {
      tariff: {
        titleTariff: 'Разовый',
      },
      _id: '667839d2b05a4b118a1e4eb0',
      email: 'employer2@example.com',
      token: '648ed3e8-879d-4b29-9353-b683f5013682',
      companyName: 'Company B',
      industry: 'Finance',
      description: 'Company B is a financial services company providing investment solutions.',
      address: '456 Elm St, City, Country',
      contacts: '+1 (234) 567-8901',
      documents: 'fixtures/dummy.pdf',
      foundationYear: '2019',
      role: 'employer',
      isPublished: true,
      avatar: 'fixtures/logo_company_megaservice.png',
      vacancies: [
        '667839d2b05a4b118a1e4ea6',
        '667839d2b05a4b118a1e4ea4',
        '667839d2b05a4b118a1e4ea3',
        '667839d2b05a4b118a1e4ea2',
      ],
      isArchive: false,
      createdAt: '2024-06-23T15:05:54.522Z',
      updatedAt: '2024-06-23T15:05:54.522Z',
      __v: 0,
    },
    archive: false,
    createdAt: '2024-06-23T15:05:54.186Z',
    updatedAt: '2024-06-23T15:05:54.728Z',
    __v: 0,
  },
  {
    salary: {
      minSalary: 45000,
      maxSalary: 75000,
    },
    age: {
      minAge: 28,
      maxAge: 45,
    },
    _id: '667839d2b05a4b118a1e4ea4',
    vacancyTitle: 'Project Manager',
    city: 'Rostov-on-Don',
    aboutVacancy:
      'We are looking for an experienced Project Manager to join our team. The ideal candidate will have experience in project management and a strong organizational mindset. You will be responsible for overseeing projects from inception to completion.',
    responsibilities:
      'Oversee projects from inception to completion. Develop project plans and timelines. Coordinate with cross-functional teams. Ensure projects are completed on time and within budget.',
    workConditions:
      'Full-time position. Flexible working hours. Remote work options available. Competitive salary and benefits.',
    country: 'Russia',
    fieldOfWork: 'Project Management',
    education: 'Высшее',
    employmentType: 'Полная',
    employer: {
      tariff: {
        titleTariff: 'Разовый',
      },
      _id: '667839d2b05a4b118a1e4eb0',
      email: 'employer2@example.com',
      token: '648ed3e8-879d-4b29-9353-b683f5013682',
      companyName: 'Company B',
      industry: 'Finance',
      description: 'Company B is a financial services company providing investment solutions.',
      address: '456 Elm St, City, Country',
      contacts: '+1 (234) 567-8901',
      documents: 'fixtures/dummy.pdf',
      foundationYear: '2019',
      role: 'employer',
      isPublished: true,
      avatar: 'fixtures/logo_company_megaservice.png',
      vacancies: [
        '667839d2b05a4b118a1e4ea6',
        '667839d2b05a4b118a1e4ea4',
        '667839d2b05a4b118a1e4ea3',
        '667839d2b05a4b118a1e4ea2',
      ],
      isArchive: false,
      createdAt: '2024-06-23T15:05:54.522Z',
      updatedAt: '2024-06-23T15:05:54.522Z',
      __v: 0,
    },
    archive: false,
    createdAt: '2024-06-23T15:05:54.186Z',
    updatedAt: '2024-06-23T15:05:54.728Z',
    __v: 0,
  },
  {
    salary: {
      minSalary: 60000,
      maxSalary: 80000,
    },
    age: {
      minAge: 28,
      maxAge: 45,
    },
    _id: '667839d2b05a4b118a1e4ea5',
    vacancyTitle: 'Механик',
    city: 'Бишкек',
    aboutVacancy:
      'Мы ищем опытного механика для нашей команды. Идеальный кандидат должен иметь опыт работы механиком и быть способным решать сложные технические задачи. Вы будете отвечать за диагностику, ремонт и обслуживание техники.',
    responsibilities:
      'Проводить диагностику и ремонт техники. Обеспечивать техническое обслуживание и профилактику оборудования. Координировать работу с другими членами команды. Обеспечивать выполнение задач в срок и в рамках бюджета.',
    workConditions:
      'Полная занятость. Гибкий график работы. Возможность удаленной работы. Конкурентоспособная зарплата и социальный пакет.',
    country: 'Кыргызстан',
    fieldOfWork: 'Техническое обслуживание и ремонт',
    education: 'Среднее',
    employmentType: 'Полная',
    employer: {
      tariff: {
        titleTariff: 'Разовый',
      },
      _id: '667839d2b05a4b118a1e4eaf',
      email: 'muradil.koychubekob@gmail.com',
      token: 'fa0c1470-b06b-40a7-8d38-eb60d50bf92e',
      companyName: 'Company A',
      industry: 'Technology',
      description: 'Company A is a leading technology firm specializing in software development.',
      address: '123 Main St, City, Country',
      contacts: '+1 (123) 456-7890',
      documents: 'fixtures/dummy.pdf',
      foundationYear: '2020',
      role: 'employer',
      isPublished: true,
      avatar: 'fixtures/logo_company_megaservice.png',
      vacancies: [
        '667839d2b05a4b118a1e4e9f',
        '667839d2b05a4b118a1e4ea0',
        '667839d2b05a4b118a1e4ea1',
        '667839d2b05a4b118a1e4ea5',
      ],
      isArchive: false,
      createdAt: '2024-06-23T15:05:54.523Z',
      updatedAt: '2024-06-23T15:05:54.523Z',
      __v: 0,
    },
    archive: false,
    createdAt: '2024-06-23T15:05:54.186Z',
    updatedAt: '2024-06-23T15:05:54.720Z',
    __v: 0,
  },
  {
    salary: {
      minSalary: 45000,
      maxSalary: 75000,
    },
    age: {
      minAge: 28,
      maxAge: 45,
    },
    _id: '667839d2b05a4b118a1e4ea6',
    vacancyTitle: 'Водитель',
    city: 'Бишкек',
    aboutVacancy:
      'Мы ищем опытного водителя для нашей команды. Идеальный кандидат должен иметь опыт работы водителем и хорошие навыки вождения. Вы будете отвечать за безопасную и своевременную доставку людей и грузов.',
    responsibilities:
      'Обеспечивать безопасную и своевременную доставку людей и грузов. Следить за техническим состоянием автомобиля. Выполнять мелкий ремонт и техническое обслуживание. Вести отчетность по пробегу и расходу топлива.',
    workConditions:
      'Полная занятость. Гибкий график работы. Возможность переработок. Конкурентоспособная зарплата и социальный пакет.',
    country: 'Кыргызстан',
    fieldOfWork: 'Транспорт и логистика',
    education: 'Среднее',
    employmentType: 'Полная',
    employer: {
      tariff: {
        titleTariff: 'Разовый',
      },
      _id: '667839d2b05a4b118a1e4eb0',
      email: 'employer2@example.com',
      token: '648ed3e8-879d-4b29-9353-b683f5013682',
      companyName: 'Company B',
      industry: 'Finance',
      description: 'Company B is a financial services company providing investment solutions.',
      address: '456 Elm St, City, Country',
      contacts: '+1 (234) 567-8901',
      documents: 'fixtures/dummy.pdf',
      foundationYear: '2019',
      role: 'employer',
      isPublished: true,
      avatar: 'fixtures/logo_company_megaservice.png',
      vacancies: [
        '667839d2b05a4b118a1e4ea6',
        '667839d2b05a4b118a1e4ea4',
        '667839d2b05a4b118a1e4ea3',
        '667839d2b05a4b118a1e4ea2',
      ],
      isArchive: false,
      createdAt: '2024-06-23T15:05:54.522Z',
      updatedAt: '2024-06-23T15:05:54.522Z',
      __v: 0,
    },
    archive: false,
    createdAt: '2024-06-23T15:05:54.186Z',
    updatedAt: '2024-06-23T15:05:54.728Z',
    __v: 0,
  },
];

describe('getAllVacancy', () => {
  beforeEach(() => {
    mockedAxiosApi.get.mockResolvedValue({ data: mockVacancies });
  });

  test('getAllVacancy', async () => {
    const store = configureStore({
      reducer: {
        vacancies: vacancyReducer,
      },
    });
    await store.dispatch(getAllVacancy());
    const state = store.getState();
    const vacancies = state.vacancies.vacancies;

    expect(vacancies).toEqual(mockVacancies);
    expect(mockedAxiosApi.get).toHaveBeenCalledWith('/vacancy');
  });
});
