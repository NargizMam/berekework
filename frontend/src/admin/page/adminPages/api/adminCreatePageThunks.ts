import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePage } from '../../../../shared/api/admin/types';
import axiosApi from '../../../../app/axiosApi';

export const createPage = createAsyncThunk<void, CreatePage>(
  'page/create',
  async (data) => {
    await axiosApi.post('/page', data);
  },
);