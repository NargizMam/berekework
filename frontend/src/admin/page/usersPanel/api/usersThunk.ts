import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';

export const getAllUser = createAsyncThunk(
  'users/getAll',
  async () => {
    const response = await axiosApi.get('/user');
    return response.data;
  }
);