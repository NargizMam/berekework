import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { User } from '../model/usersSlice';

export const getAllUser = createAsyncThunk<User[], string | undefined>(
  'users/getAll',
  async (filter) => {
    const response = await axiosApi.get<User[]>(`/user${filter ? `?filter=${filter.toLowerCase()}` : ''}`);
    return response.data;
  }
);