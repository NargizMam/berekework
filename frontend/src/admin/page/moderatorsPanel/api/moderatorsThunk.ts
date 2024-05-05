import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { GlobalError } from '../../../../client/page/Auth/model/types';
import { isAxiosError } from 'axios';

export const getAllModerators = createAsyncThunk(
  'moderators/getAll',
  async () => {
    const response = await axiosApi.get('/user?role=moderators');
    return response.data;
  }
);
export const createModerator = createAsyncThunk(
  'moderators/create',
  async () => {
    const response = await axiosApi.post('/user?role=moderators');
    return response.data;
  }
);
export const deleteModerator = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
  'moderators/delete',
  async (moderatorsId, {rejectWithValue}) => {
    try{
      const response = await axiosApi.delete(`/moderators/${moderatorsId}`, );
      return response.data;
    }catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);