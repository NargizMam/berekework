import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, GlobalError, LoginMutation, RegisterMutation } from '../model/types';
import axiosApi from '../../../../app/axiosApi';
import { isAxiosError } from 'axios';
import { unsetUser } from '../model/AuthSlice';
import { RootState } from '../../../../app/store/store';
import { ValidationError } from '../../../../types';

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

export const login = createAsyncThunk<AuthResponse, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<AuthResponse>('/user/sessions', loginMutation);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { getState, dispatch }) => {
    const token = getState().auth.user?.token;
    await axiosApi.delete('/user/sessions', { headers: { Authorization: 'Bearer ' + token } });
    dispatch(unsetUser());
  },
);
