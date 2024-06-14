import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { User } from '../../app/types';
import { UserMutation } from '../../client/page/Profile/model/types';
import { GlobalError } from '../../client/page/Auth/model/types';
import { openErrorMessage, openSuccessMessage } from '../../widgets/WarningMessage/warningMessageSlice';
import { AxiosError } from 'axios';

export const getAllUser = createAsyncThunk<User[], string | undefined>('users/getAll', async (filter) => {
  const response = await axiosApi.get<User[]>(`/user${filter ? `?filter=${filter.toLowerCase()}` : ''}`);
  return response.data;
});

export const getSingleUser = createAsyncThunk<User, string>('users/getSingle', async (id) => {
  const response = await axiosApi.get<User>('/user/' + id);
  return response.data;
});

interface ProfileChange {
  profileMutation: UserMutation;
  userId: string;
}

export const changeProfile = createAsyncThunk<void, ProfileChange, { rejectValue: GlobalError }>(
  'applicant/add',
  async ({ profileMutation, userId }, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    try {
      Object.entries(profileMutation).forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'avatar' && value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'object' || Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as string);
          }
        }
      });
      const response = await axiosApi.patch(`user/${userId}`, formData);
      dispatch(openSuccessMessage(response.data.message));
      return response.data;
    } catch (err) {
      const error = err as AxiosError<GlobalError>;
      if (error.response && error.response.data && error.response.data) {
        dispatch(openErrorMessage(error.response.data));
        return rejectWithValue(error.response.data);
      }
      dispatch(openErrorMessage('An unexpected error occurred'));
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk<void, string>('users/delete', async (id) => {
  await axiosApi.delete(`/user/${id}`);
});
