import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { openErrorMessage } from '../../../../widgets/WarningMessage/warningMessageSlice';
import { isAxiosError } from 'axios';
import { GlobalError } from '../../Auth/model/types';
import { ChangePasswordData, SendOtpPayload } from '../types';

export const sendEmail = createAsyncThunk<string,   string,  { rejectValue: GlobalError }>(
  'changePassword/sendEmail',
  async (email, { rejectWithValue, dispatch}) => {
    try {
      const response = await axiosApi.post('/user/send-otp', {email});
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        dispatch(openErrorMessage(error.response.data.message));
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  },
);

export const sendOtp = createAsyncThunk<string, SendOtpPayload, { rejectValue: GlobalError }>(
  'changePassword/sendOtp',
  async ({ email, otp }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosApi.post('/user/compare-otp', { email, otp });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        dispatch(openErrorMessage(error.response.data.message));
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  },
);

export const changePassword = createAsyncThunk<string, ChangePasswordData, { rejectValue: GlobalError }>(
  'changePassword/changePassword',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosApi.post('/user/change-password', { email, password });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        dispatch(openErrorMessage(error.response.data.message));
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  },
);