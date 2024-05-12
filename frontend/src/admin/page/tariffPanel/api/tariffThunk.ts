import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { TariffMutation, TariffsApi } from '../model/types';
import { isAxiosError } from 'axios';
import { ValidationError } from '../../../../types';

export const createTariff = createAsyncThunk<
  void,
  TariffMutation,
  {
    rejectValue: ValidationError;
  }
>('tariff/create', async (tariff, { rejectWithValue }) => {
  try {
    await axiosApi.post('/tariff', tariff);
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 422) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const getAllTariff = createAsyncThunk<TariffsApi[]>('tariff/getAll', async () => {
  const response = await axiosApi.get<TariffsApi[]>('/tariff');
  return response.data;
});

export const getSingleTariff = createAsyncThunk<TariffsApi, string>('tariff/getSingle', async (id) => {
  const response = await axiosApi.get<TariffsApi>(`/tariff/${id}`);
  return response.data;
});

interface TariffUpdate {
  id: string;
  data: TariffMutation;
}

export const updateTariff = createAsyncThunk<void, TariffUpdate>('tariff/update', async ({ id, data }) => {
  await axiosApi.patch(`/tariff/${id}`, data);
});

export const deleteTariff = createAsyncThunk<void, string>('tariff/delete', async (id) => {
  await axiosApi.delete(`/tariff/${id}`);
});
