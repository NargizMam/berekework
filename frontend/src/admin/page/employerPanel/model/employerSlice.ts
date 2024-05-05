import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createEmployer, getAllEmployer } from '../api/employerThunk';
import { RootState } from '../../../../app/store/store';
import { Employer } from './types';
import { ValidationError } from '../../../../types';

interface EmployerState {
  employers: Employer[];
  employersLoading: boolean;
  createEmployerLoading: boolean;
  employerError: ValidationError | null;
}

const initialState: EmployerState = {
  employers: [],
  employersLoading: false,
  createEmployerLoading: false,
  employerError: null,
};

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEmployer.pending, (state) => {
      state.createEmployerLoading = true;
    });
    builder.addCase(createEmployer.fulfilled, (state) => {
      state.createEmployerLoading = false;
    });
    builder.addCase(createEmployer.rejected, (state, {payload: error}) => {
      state.createEmployerLoading = false;
      state.employerError = error || null;
    });
    builder.addCase(getAllEmployer.pending, (state) => {
      state.employersLoading = true;
    });
    builder.addCase(getAllEmployer.fulfilled, (state, { payload: employers }: PayloadAction<Employer[]>) => {
      state.employersLoading = false;
      state.employers = employers;
    });
    builder.addCase(getAllEmployer.rejected, (state) => {
      state.employersLoading = false;
    });
  },
});

export const employerReducer = employerSlice.reducer;
export const selectEmployers = (state: RootState) => state.employer.employers;
export const selectEmployerLoading = (state: RootState) => state.employer.employersLoading;
export const selectEmployerError = (state: RootState) => state.employer.employerError;
