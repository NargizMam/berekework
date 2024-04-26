import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { LastNewsBlockApiData } from './types';
import axiosApi from '../../../../app/axiosApi';

export const getLastNewsBlock = createAsyncThunk<LastNewsBlockApiData[] | LastNewsBlockApiData, string | undefined>(
  'lastNewsBlock/geLastNewsBlock',
  async (pageId: string | undefined) => {
    let url = '/last-news-block';

    if (pageId) {
      url += `/?pageId=${pageId}`;
    }

    const response = await axiosApi.get<LastNewsBlockApiData[] | LastNewsBlockApiData>(url);
    return response.data;
  },
);

export const getLastNewsBlockById = createAsyncThunk<LastNewsBlockApiData, string>(
  'lastNewsBlock/geLastNewsBlock',
  async (id) => {
    const response = await axiosApi.get<LastNewsBlockApiData>(`/last-news-block/${id}`);
    return response.data;
  },
);
