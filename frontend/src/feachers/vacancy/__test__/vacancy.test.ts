import { getAllVacancy } from '../vacancyThunk';
import axiosApi from '../../../app/axiosApi';
import { configureStore } from '@reduxjs/toolkit';
import { vacancyReducer } from '../vacancySlice';
import { mockVacancies } from '../../../mock/mockVacancies';

jest.mock('../../../app/axiosApi', () => ({
  get: jest.fn(),
}));
const mockedAxiosApi = axiosApi as jest.Mocked<typeof axiosApi>;

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
