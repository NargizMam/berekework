import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { GlobalError, ValidationError } from '../../../../client/page/Auth/model/types';
import { isAxiosError } from 'axios';
import { Moderator, ModeratorApi } from '../../../../types';

export const getAllModerators = createAsyncThunk<ModeratorApi[]>('moderators/getAll', async () => {
  const response = await axiosApi.get('/user?filter=moderator');
  return response.data;
});

export const createModerator = createAsyncThunk<string, Moderator, { rejectValue: ValidationError }>(
  'moderators/create',
  async (moderator, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/user?role=moderator', moderator);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const deleteModerator = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
  'moderators/delete',
  async (moderatorsId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/user/${moderatorsId}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
