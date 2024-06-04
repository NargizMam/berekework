import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { User } from '../../app/types';
import { UserMutation } from '../../client/page/Profile/model/types';

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

export const changeProfile = createAsyncThunk<void, ProfileChange>(
  'applicant/add',
  async ({ profileMutation, userId }) => {
    const formData = new FormData();

    Object.entries(profileMutation).forEach(([key, value]) => {
      if (key === 'workExperience') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    return axiosApi.patch(userId ? `applicants?userId=${userId}` : '/applicants', formData);
  }
);

export const deleteUser = createAsyncThunk<void, string>('users/delete', async (id) => {
  await axiosApi.delete(`/user/${id}`);
});