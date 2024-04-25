import {createAsyncThunk} from '@reduxjs/toolkit';
import {RateBlock} from "./types";
import axiosApi from '../../../../app/axiosApi';

export const fetchRateBlock = createAsyncThunk<RateBlock[]>(
    'rateBlock/fetchAll',
    async () => {
        const response = await axiosApi.get<RateBlock[]>(`/tariff`);
        return response.data;
    }
);


