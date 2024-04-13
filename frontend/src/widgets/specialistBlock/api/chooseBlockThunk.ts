import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChooseBlock } from '../../../types';
import axiosApi from '../../../axiosApi.ts';

export const fetchChooseBlock = createAsyncThunk<ChooseBlock>('chooseBlock/fetchChooseBlock', async () => {
  const response = await axiosApi.get<ChooseBlock>('/chooseBlock');
  return response.data;
});
