import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { GalleryVideoBlockApiData } from './types';

export const getGalleryVideoBlock = createAsyncThunk<GalleryVideoBlockApiData, string | undefined>(
  'lastNewsBlock/geLastNewsBlock',
  async (pageId: string | undefined) => {
    let url = '/gallery-video-block';

    if (pageId) {
      url += `/?pageId=${pageId}`;
    }

    const response = await axiosApi.get<GalleryVideoBlockApiData[]>(url);
    return Array.isArray(response.data) ? response.data[0] : response.data;
  },
);

export const getLastNewsBlockById = createAsyncThunk<GalleryVideoBlockApiData, string>(
  'lastNewsBlock/geLastNewsBlock',
  async (id) => {
    const response = await axiosApi.get<GalleryVideoBlockApiData>(`/last-news-block/${id}`);
    return response.data;
  },
);
