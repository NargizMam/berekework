import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createEmployer, getAllEmployer, getEmployersProfileInfo } from '../api/employerThunk';
import { RootState } from '../../../../app/store/store';
import { Employer } from './types';
import { EmployerInfoApi, ValidationError } from '../../../../types';

interface EmployerState {
  employers: Employer[];
  employersLoading: boolean;
  createEmployerLoading: boolean;
  employersProfile: EmployerInfoApi | null;
  employersProfileLoading: boolean;
  employerError: ValidationError | null;
}

const initialState: EmployerState = {
  employers: [],
  employersLoading: false,
  createEmployerLoading: false,
  employersProfile: null,
  employersProfileLoading: false,
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
    builder.addCase(getEmployersProfileInfo.pending, (state) => {
      state.employersProfileLoading = true;
    });
    builder.addCase(getEmployersProfileInfo.fulfilled, (state, { payload: employersProfile }: PayloadAction<EmployerInfoApi>) => {
      state.employersProfileLoading = false;
      state.employersProfile = employersProfile;
    });
    builder.addCase(getEmployersProfileInfo.rejected, (state) => {
      state.employersProfileLoading = false;
    });
  },
});

export const employerReducer = employerSlice.reducer;
export const selectEmployers = (state: RootState) => state.employerAdmin.employers;
export const selectEmployerLoading = (state: RootState) => state.employerAdmin.employersLoading;
export const selectEmployerError = (state: RootState) => state.employerAdmin.employerError;
export const selectEmployersProfileInfo = (state: RootState) => state.employerAdmin.employersProfile;
export const selectEmployersProfileLoading = (state: RootState) => state.employerAdmin.employersProfileLoading;
