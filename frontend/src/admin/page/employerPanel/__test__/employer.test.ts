import axiosApi from '../../../../app/axiosApi';
import { configureStore } from '@reduxjs/toolkit';
import { employerReducer } from '../model/employerSlice';
import { getAllEmployer } from '../api/employerThunk';
import { mockEmployer } from '../../../../mock/mockEmployers';

jest.mock('../../../../app/axiosApi', () => ({
  get: jest.fn(),
}));
const mockedAxiosApi = axiosApi as jest.Mocked<typeof axiosApi>;

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
