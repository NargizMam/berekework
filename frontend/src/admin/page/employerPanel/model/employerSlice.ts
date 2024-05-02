import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllEmployer } from '../api/employerThunk';
import { RootState } from '../../../../app/store/store';
import { Employer } from './types';

interface EmployerState {
  employers: Employer[];
  employersLoading: boolean;
}

const initialState: EmployerState = {
  employers: [],
  employersLoading: false,
};

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEmployer.pending, (state) => {
      state.employersLoading = true;
    });
    builder.addCase(getAllEmployer.fulfilled, (state, {payload: employers}: PayloadAction<Employer[]>) => {
      state.employersLoading = false;
      state.employers = employers;
    });
    builder.addCase(getAllEmployer.rejected, (state) => {
      state.employersLoading = false;
    });
  }
});

export const employerReducer = employerSlice.reducer;
export const selectEmployers = (state: RootState) => state.employer.employers;
export const selectEmployerLoading = (state: RootState) => state.employer.employersLoading;