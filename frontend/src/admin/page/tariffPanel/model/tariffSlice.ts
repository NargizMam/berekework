import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTariff, getAllTariff, getSingleTariff } from '../api/tariffThunk';
import { RootState } from '../../../../app/store/store';
import { TariffsApi } from './types';
import { ValidationError } from '../../../../types';

interface TariffState {
  tariffs: TariffsApi[];
  tariff: TariffsApi | null;
  tariffsLoading: boolean;
  tariffLoading: boolean;
  tariffError: ValidationError | null;
}

const initialState: TariffState = {
  tariffs: [],
  tariff: null,
  tariffsLoading: false,
  tariffLoading: false,
  tariffError: null,
};

const tariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTariff.pending, (state) => {
      state.tariffLoading = true;
    });
    builder.addCase(createTariff.fulfilled, (state) => {
      state.tariffLoading = false;
    });
    builder.addCase(createTariff.rejected, (state, {payload: error}) => {
      state.tariffLoading = false;
      state.tariffError = error || null;
    });
    builder.addCase(getAllTariff.pending, (state) => {
      state.tariffsLoading = true;
    });
    builder.addCase(getAllTariff.fulfilled, (state, { payload: tariffs }: PayloadAction<TariffsApi[]>) => {
      state.tariffsLoading = false;
      state.tariffs = tariffs;
    });
    builder.addCase(getAllTariff.rejected, (state) => {
      state.tariffsLoading = false;
    });
    builder.addCase(getSingleTariff.pending, (state) => {
      state.tariffLoading = true;
    });
    builder.addCase(getSingleTariff.fulfilled, (state, { payload: tariff }: PayloadAction<TariffsApi>) => {
      state.tariffLoading = false;
      state.tariff = tariff;
    });
    builder.addCase(getSingleTariff.rejected, (state) => {
      state.tariffLoading = false;
    });
  },
});

export const tariffReducer = tariffSlice.reducer;
export const selectTariffs = (state: RootState) => state.tariff.tariffs;
export const selectTariff = (state: RootState) => state.tariff.tariff;
export const selectTariffsLoading = (state: RootState) => state.tariff.tariffsLoading;
export const selectTariffLoading = (state: RootState) => state.tariff.tariffLoading;
export const selectTariffError = (state: RootState) => state.tariff.tariffError;
