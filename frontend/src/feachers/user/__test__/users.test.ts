import { getAllUser } from '../usersThunk';
import axiosApi from '../../../app/axiosApi';
import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../usersSlice';
import { mockUsers } from '../../../mock/mockUsers';

jest.mock('../../../app/axiosApi', () => ({
  get: jest.fn(),
}));
const mockedAxiosApi = axiosApi as jest.Mocked<typeof axiosApi>;

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
