import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { IFooterLinks } from '../../../../shared/types';
import axiosApi from '../../../../app/axiosApi';

export const fetchFooterData = createAsyncThunk(
  'footer/fetchFooterData',
  async () => {
    const response = await axios.get('/footer');
    return response.data;
  }
);

export const createFooter = createAsyncThunk(
  'footer/createFooter',
  async (footerData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/footer', footerData);
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
  async (links: IFooterLinks) => {
    const formData = new FormData();
    formData.append('title', links.title);

    if (links.links) {
      links.links.forEach((link, index) => {
        formData.append(`links[${index}][url]`, link.url);
        formData.append(`links[${index}][text]`, link.text);
      });
    }
    await axiosApi.post('/footer/new-links', formData);
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


