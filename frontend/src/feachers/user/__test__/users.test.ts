import { getAllUser } from '../usersThunk';
import axiosApi from '../../../app/axiosApi';
import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../usersSlice';

jest.mock('../../../app/axiosApi', () => ({
  get: jest.fn(),
}));
const mockedAxiosApi = axiosApi as jest.Mocked<typeof axiosApi>;
const mockUsers = [
  {
    contacts: {
      phone: '+996987654321',
      whatsapp: '+996987654321',
      telegram: '@user2',
    },
    _id: '667839d1b05a4b118a1e4e95',
    email: 'user2@jail.com',
    token: 'a1d6e01a-b461-491e-b859-0c6a3870ffdf',
    role: 'user',
    avatar: '/fixtures/avatar.jpg',
    name: 'Иван',
    surname: 'Иванов',
    patronymic: 'Иванович',
    dateOfBirth: '2000-05-15',
    country: 'Кыргызстан',
    city: 'Ош',
    education: 'Среднее',
    aboutMe:
      'Маркетолог с более чем 3-летним опытом работы в разработке стратегий и продвижении брендов. Специализируюсь на анализе рынка, планировании и реализации маркетинговых кампаний. Мои ключевые навыки включают стратегическое мышление, креативный подход к решению задач и отличные коммуникативные навыки. Я стремлюсь к постоянному развитию и улучшению своих профессиональных качеств.',
    workExperience: [
      {
        fieldOfWork: 'Маркетинг',
        duration: '3 года',
      },
    ],
    preferredJob: 'Маркетолог',
    preferredCity: 'Ош',
    isArchive: false,
    createdAt: '2024-06-23T15:05:53.927Z',
    updatedAt: '2024-06-23T15:05:53.927Z',
    __v: 0,
  },
  {
    contacts: {
      phone: '+996123456789',
      whatsapp: '+996123456789',
      telegram: '@user1',
    },
    _id: '667839d1b05a4b118a1e4e94',
    email: 'user1@example.com',
    token: '3df1f1d2-b024-4d80-896e-42a728f6ed06',
    role: 'user',
    avatar: '/fixtures/avatar.jpg',
    name: 'Арсен',
    surname: 'Белеков',
    patronymic: 'Кызаев',
    dateOfBirth: '2006-10-03',
    country: 'Кыргызстан',
    city: 'Бишкек',
    education: 'Высшее',
    aboutMe:
      'Опытный графический дизайнер с креативным подходом к работе и отличными навыками работы в команде. Я имею более 5 лет опыта работы в различных проектах, включая разработку брендбуков, рекламных материалов и дизайна интерфейсов. Мои сильные стороны включают внимательность к деталям, умение работать в команде и быстро адаптироваться к изменениям.',
    workExperience: [
      {
        fieldOfWork: 'Графический дизайн',
        duration: '5 лет',
      },
    ],
    preferredJob: 'Графический дизайнер',
    preferredCity: 'Бишкек',
    isArchive: false,
    createdAt: '2024-06-23T15:05:53.927Z',
    updatedAt: '2024-06-23T15:05:53.927Z',
    __v: 0,
  },
];

describe('User', () => {
  beforeEach(() => {
    mockedAxiosApi.get.mockResolvedValue({ data: mockUsers });
  });

  test('getAllUser', async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });
    await store.dispatch(getAllUser());
    const state = store.getState();
    const users = state.users.users;

    expect(users).toEqual(mockUsers);
    expect(mockedAxiosApi.get).toHaveBeenCalledWith('/user');
  });
});
