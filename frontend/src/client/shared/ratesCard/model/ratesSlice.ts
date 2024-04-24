import {RateBlock} from "./types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchRateBlock} from "./ratesThunk.ts";

interface RateState {
    items: RateBlock[];
    fetchAllLoading: boolean;
}

const initialState: RateState = {
    items: [],
    fetchAllLoading: false,
};

export const rateSlice = createSlice({
    name: 'rate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRateBlock.pending, (state) => {
            state.fetchAllLoading = true;
        });
        builder.addCase(fetchRateBlock.fulfilled, (state, {payload: rates}) => {
            state.fetchAllLoading = false;
            state.items = rates;
        });
        builder.addCase(fetchRateBlock.rejected, (state) => {
            state.fetchAllLoading = false;
        });
    },
});

export const rateReducer = rateSlice.reducer;

