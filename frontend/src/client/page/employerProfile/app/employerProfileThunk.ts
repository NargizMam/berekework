import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { EmployerInfoApi } from '../../../../types';

export const getEmployersProfileInfo = createAsyncThunk<EmployerInfoApi, string>(
  'employersProfile/getInfo',
  async (id) => {
    const response = await axiosApi.get(`/employer/${id}`);
    return response.data;
  }
);

