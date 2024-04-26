import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTariff } from '../api/tariffThunk';
import { RootState } from '../../../../app/store/store';

interface Tariff {
  _id: string;
  title: string;
  description: string[];
}

interface TariffState {
  tariffs: Tariff[];
  tariffsLoading: boolean;
}

const initialState: TariffState = {
  tariffs: [],
  tariffsLoading: false,
};

const tariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTariff.pending, (state) => {
      state.tariffsLoading = true;
    });
    builder.addCase(getAllTariff.fulfilled, (state, { payload: tariffs }: PayloadAction<Tariff[]>) => {
      state.tariffsLoading = false;
      state.tariffs = tariffs;
    });
    builder.addCase(getAllTariff.rejected, (state) => {
      state.tariffsLoading = false;
    });
  },
});

export const tariffReducer = tariffSlice.reducer;
export const selectTariffs = (state: RootState) => state.tariff.tariffs;
