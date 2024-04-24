import {createAsyncThunk} from '@reduxjs/toolkit';
import {RateBlock} from "./types";
import axiosApi from '../../../../axiosApi.ts';
export const fetchRateBlock = createAsyncThunk<RateBlock[]>(
    'rateBlock/fetchAll',
    async () => {
        const response = await axiosApi.get<RateBlock[]>(`/tariff`);
        return response.data;
    }
);


