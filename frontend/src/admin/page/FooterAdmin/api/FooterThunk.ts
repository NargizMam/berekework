import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { IFooterLinks } from '../../../../shared/types';
import axiosApi from '../../../../app/axiosApi';

export const fetchFooterData = createAsyncThunk(
  'footer/fetchFooterData',
  async () => {
    const response = await axiosApi.get('/footer');
    return response.data;
  }
);

export const createFooter = createAsyncThunk(
  'footer/createFooter',
  async (footerData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/footer', footerData);
      return response.data;
    }  catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createFooterLinks = createAsyncThunk(
  'footer/addFooterLinks',
  async (links: IFooterLinks, { rejectWithValue }) => {
    try {
      const data = {
        title: links.title,
        links: links.links,
      };

      const response = await axiosApi.post('/footer/new-links', data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteFooterLink = createAsyncThunk(
  'footer/deleteFooterLink',
  async (linkId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/footer/footerLinks/${linkId}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);


