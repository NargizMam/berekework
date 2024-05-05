import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { HeaderMutation, IHeader } from '../model/types';


export const createHeader = createAsyncThunk<void, HeaderMutation>(
  'header/create',
  async (header) => {
    const formData = new FormData();

    const keys = Object.keys(header) as (keyof HeaderMutation)[];
    keys.forEach((key) => {
      const value = header[key];

      if (value !== null) {
        if (Array.isArray(value) && value.length > 0 && key === 'navbarItems') {
          const navbarItemsJSON = JSON.stringify(value);
          formData.append(key, navbarItemsJSON);
        } else {
          formData.append(key, value as string);
        }
      }
    });

    await axiosApi.post('/header', formData);
  },
);

export const fetchHeader = createAsyncThunk<IHeader>(
  'header/fetch',
  async () => {
    const result = await axiosApi.get('/header');
    return result.data;
  },
);