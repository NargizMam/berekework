import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { GlobalError, ValidationError } from '../../../../client/page/Auth/model/types';
import { isAxiosError } from 'axios';
import { Moderator, ModeratorApi } from '../../../../types';
import { openErrorMessage, openSuccessMessage } from '../../../../widgets/WarningMessage/warningMessageSlice';
import { RootState } from '../../../../app/store/store';

export const getAllModerators = createAsyncThunk<ModeratorApi[]>('moderators/getAll', async () => {
  const response = await axiosApi.get('/user?filter=moderator');
  return response.data;
});

export const createModerator = createAsyncThunk<string, Moderator, { rejectValue: ValidationError; state: RootState }>(
  'moderators/create',
  async (moderator, { getState, rejectWithValue, dispatch }) => {
    try {
      const token = getState().auth.user?.token;
      const response = await axiosApi.post('/moderator', moderator, { headers: { Authorization: 'Bearer ' + token } });
      dispatch(openSuccessMessage(response.data.message));
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        dispatch(openErrorMessage(e.response.data));
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const deleteModerator = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
  'moderators/delete',
  async (moderatorsId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosApi.delete(`/moderator/${moderatorsId}`);
      dispatch(openSuccessMessage(response.data.text));
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        dispatch(openErrorMessage(e.response.data.message));
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
