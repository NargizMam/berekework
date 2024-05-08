import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';

export const getAllTariff = createAsyncThunk(
  'tariff/getAll',
  async () => {
    const response = await axiosApi.get('/tariff');
    return response.data;
  }
);

export const deleteTariff = createAsyncThunk<void, string>(
  'tariff/delete',
  async (id) => {
    await axiosApi.delete(`/tariff/${id}`);
  }
);