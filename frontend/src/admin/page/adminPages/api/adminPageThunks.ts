import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { AllPagesCRM, CreatePage, OnePageResponse } from '../model/types';

export const createPage = createAsyncThunk<string, CreatePage>('page/create', async (data) => {
  const response = await axiosApi.post('/page', data);
  return response.data.id;
});

export const fetchOnePage = createAsyncThunk<OnePageResponse, string>('page/fetchOne', async (id) => {
  const response = await axiosApi.get(`/page/${id}`);
  return response.data;
});

export const fetchAllPages = createAsyncThunk<AllPagesCRM[]>('page/fetchAllPages', async () => {
  const response = await axiosApi.get('/page?crmPages=true');
  return response.data;
});
