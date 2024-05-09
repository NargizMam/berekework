import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { TariffMutation, TariffsApi } from '../model/types';

export const createTariff = createAsyncThunk<void, TariffMutation>('tariff/create', async (tariff) => {
  await axiosApi.post('/tariff', tariff);
});

export const getAllTariff = createAsyncThunk<TariffsApi[]>('tariff/getAll', async () => {
  const response = await axiosApi.get<TariffsApi[]>('/tariff');
  return response.data;
});
export const getSingleTariff = createAsyncThunk<TariffsApi, string>('tariff/getSingle', async ( id ) => {
  const response = await axiosApi.get<TariffsApi>(`/tariff/${id}`);
  return response.data;
});

export const deleteTariff = createAsyncThunk<void, string>('tariff/delete', async (id) => {
  await axiosApi.delete(`/tariff/${id}`);
});
