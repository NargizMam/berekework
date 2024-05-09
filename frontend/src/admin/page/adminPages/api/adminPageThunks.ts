import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { AllPagesCRM, CreateEditPage, IDeleteComponents, OnePageResponse } from '../model/types';

export const createPage = createAsyncThunk<string, CreateEditPage>('page/create', async (data) => {
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

export const deleteComponent = createAsyncThunk<void, IDeleteComponents>('component/delete', async (component) => {
  const data = {
    id: component.componentId,
    pageId: component.pageId,
    index: component.index,
  };

  await axiosApi.delete(`/${component.link}`, { data });
});

export const editPage = createAsyncThunk<void, { id: string; data: CreateEditPage }>(
  'page/edit',
  async ({ id, data }) => {
    await axiosApi.put(`/page/${id}`, data);
  },
);

export const deletePage = createAsyncThunk<void, string>('page/delete', async (id) => {
  await axiosApi.delete(`/page/${id}`);
});
