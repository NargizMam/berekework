import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, GlobalError, LoginMutation, RegisterMutation, ValidationError } from '../model/types';
import axiosApi from '../../../../app/axiosApi';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<AuthResponse, RegisterMutation, { rejectValue: ValidationError }>(
  'auth/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/user', registerMutation);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);


export const login = createAsyncThunk<
  AuthResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<AuthResponse>(
      '/user/sessions',
      loginMutation,
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});