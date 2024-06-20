import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, GlobalError, LoginMutation, RegisterMutation } from '../model/types';
import axiosApi from '../../../../app/axiosApi';
import { isAxiosError } from 'axios';
import { unsetEmployer, unsetUser } from '../model/AuthSlice';
import { RootState } from '../../../../app/store/store';
import { ValidationError } from '../../../../types';
import { EmployerMutation } from '../../../../admin/page/employerPanel/model/types';
import { openErrorMessage, openSuccessMessage } from '../../../../widgets/WarningMessage/warningMessageSlice';

export const register = createAsyncThunk<AuthResponse, RegisterMutation, { rejectValue: ValidationError }>(
  'auth/register',
  async (registerMutation, { rejectWithValue, dispatch}) => {
    try {
      const response = await axiosApi.post('/user', registerMutation);
      dispatch(openSuccessMessage(response.data.message));
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        dispatch(openErrorMessage(error.response.data.message));
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  },
);

class EmployerRegisterMutation {}

export const registerEmployer = createAsyncThunk<AuthResponse, EmployerMutation, { rejectValue: ValidationError }>(
  'employer/registerEmployer',
  async (employerData: EmployerRegisterMutation, { rejectWithValue, dispatch }) => {
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
      dispatch(openSuccessMessage(response.data.message));
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        dispatch(openErrorMessage(error.response.data.message));
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  },
);
export const googleAuth = createAsyncThunk<AuthResponse, string, { rejectValue: GlobalError }>(
  'auth/googleAuth',
  async (credential, { rejectWithValue , dispatch}) => {
    try {
      const response = await axiosApi.post('/user/google', { credential });
      dispatch(openSuccessMessage(response.data.message));
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        dispatch(openErrorMessage(e.response.data.message));
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosApi.post<AuthResponse>('/user/sessions', loginMutation);
      dispatch(openSuccessMessage(response.data.message));
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
    const token = getState().auth.user?.token || getState().auth.employer?.token;
      const response = await axiosApi.delete('/user/sessions', { headers: { Authorization: 'Bearer ' + token } });
    console.log(response.data);
    if (getState().auth.user?.token) {
      dispatch(openSuccessMessage(response.data.message));
      dispatch(unsetUser());
    } else {
      dispatch(openSuccessMessage(response.data.message));
      dispatch(unsetEmployer());
    }
  },
);
