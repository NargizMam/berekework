import axiosApi from '../../../../app/axiosApi';
import { configureStore } from '@reduxjs/toolkit';
import { employerReducer } from '../model/employerSlice';
import { getAllEmployer } from '../api/employerThunk';

jest.mock('../../../../app/axiosApi', () => ({
  get: jest.fn(),
}));
const mockedAxiosApi = axiosApi as jest.Mocked<typeof axiosApi>;
const mockEmployer = [
  {
    tariff: {
      titleTariff: 'Разовый',
    },
    _id: '667839d2b05a4b118a1e4eb1',
    email: 'employer3@example.com',
    token: 'b28673fe-6cdf-4300-ab76-c0eb315bce80',
    companyName: 'Company C',
    industry: 'Healthcare',
    description: 'Company C is a healthcare organization committed to improving patient care.',
    address: '789 Oak St, City, Country',
    contacts: '+1 (345) 678-9012',
    documents: 'fixtures/dummy.pdf',
    foundationYear: '2013',
    role: 'employer',
    isPublished: false,
    avatar: 'fixtures/logo_company_megaservice.png',
    vacancies: [],
    isArchive: false,
    createdAt: '2024-06-23T15:05:54.523Z',
    updatedAt: '2024-06-23T15:05:54.523Z',
    __v: 0,
  },
  {
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
  {
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
];

describe('Employer', () => {
  beforeEach(() => {
    mockedAxiosApi.get.mockResolvedValue({ data: mockEmployer });
  });
  test('getAllEmployer', async () => {
    const store = configureStore({
      reducer: {
        employers: employerReducer,
      },
    });
    await store.dispatch(getAllEmployer());
    const state = store.getState();
    const employers = state.employers.employers;

    expect(employers).toEqual(mockEmployer);
    expect(mockedAxiosApi.get).toHaveBeenCalledWith('/employer');
  });
});