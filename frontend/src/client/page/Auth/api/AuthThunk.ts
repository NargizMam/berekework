import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, GlobalError, LoginMutation, RegisterMutation } from '../model/types';
import axiosApi from '../../../../app/axiosApi';
import { isAxiosError } from 'axios';
import { unsetUser } from '../model/AuthSlice';
import { RootState } from '../../../../app/store/store';
import { ValidationError } from '../../../../types';
import { EmployerMutation } from '../../../../admin/page/employerPanel/model/types';

export const register = createAsyncThunk<AuthResponse, RegisterMutation, { rejectValue: ValidationError }>(
  'auth/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/user', registerMutation);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  },
);

class EmployerRegisterMutation {}

export const registerEmployer = createAsyncThunk<AuthResponse, EmployerMutation, { rejectValue: ValidationError }>(
  'employer/registerEmployer',
  async (employerData: EmployerRegisterMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(employerData).forEach((key) => {
        formData.append(key, employerData[key as keyof EmployerRegisterMutation] as any);
      });
      const response = await axiosApi.post('/employer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  },
);
export const googleAuth = createAsyncThunk<AuthResponse, string, { rejectValue: GlobalError }>(
  'auth/googleAuth',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/user/google', { credential });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
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
