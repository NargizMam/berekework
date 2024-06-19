import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';

interface SelectTariff {
  email: string;
  typeTariff: string;
}

export const selectTariff = createAsyncThunk<void, SelectTariff>(
  'tariff/post',
  async (tariff) => {
    await axiosApi.post('/employer/tariff/', tariff);
  },
);