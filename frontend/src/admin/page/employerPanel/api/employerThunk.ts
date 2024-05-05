import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { Employer } from '../model/types';

export const getAllEmployer = createAsyncThunk<Employer[]>('employer/getAll', async () => {
  const response = await axiosApi.get<Employer[]>('/employer');
  return response.data;
});

export const deleteEmployer = createAsyncThunk<void, string>('employer/delete', async (id) => {
  await axiosApi.delete(`/employer/${id}`);
});