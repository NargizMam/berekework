import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axios';
import { TariffFields } from '../model/types';

export const createTariffDraft = createAsyncThunk<TariffFields>(
  'headings/createHeadingDraft',
  async () => {
    const fields = await axiosApi.post('/tariff/draft');
    return fields.data;
  },
);