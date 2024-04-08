import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axios';
import { Heading } from '../model/HeadingSlice';

export const getAllHeading = createAsyncThunk<Heading[]>(
  'headings/getAllHeading',
  async () => {
    const result = await axiosApi.get<Heading[]>('/heading');
    return result.data;
  }
);

export const getSingleHeading = createAsyncThunk<Heading, string>(
  'headings/getSingleHeading',
  async (location) => {
    const result = await axiosApi.get<Heading>(`/heading/${location}`);
    return result.data;
  }
);