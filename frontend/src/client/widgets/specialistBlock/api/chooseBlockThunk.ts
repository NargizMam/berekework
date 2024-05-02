import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChooseBlock } from '../model/types';
import axiosApi from '../../../../app/axiosApi';

export const fetchChooseBlock = createAsyncThunk<ChooseBlock>('chooseBlock/fetchChooseBlock', async () => {
  const response = await axiosApi.get<ChooseBlock>('/chooseBlock');
  return response.data;
});
