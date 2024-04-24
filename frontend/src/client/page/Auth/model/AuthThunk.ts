import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterMutation } from './types';
import axiosApi from '../../../../app/axiosApi';

export const register = createAsyncThunk<void, RegisterMutation>(
  'auth/register',
  async (registerMutation) => {
    try {
      await axiosApi.post('/user', registerMutation);
    } catch (error) {
      console.log(error);
    }
  },
);