import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createEmployer,
  deleteEmployer,
  getAllEmployer,
  getEmployersProfileInfo,
  updateStatusEmployer,
} from '../api/employerThunk';
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
  employerUpdateLoading: boolean;
  employerDeleteLoading: boolean;
}

const initialState: EmployerState = {
  employers: [],
  employersLoading: false,
  createEmployerLoading: false,
  employersProfile: null,
  employersProfileLoading: false,
  employerError: null,
  employerUpdateLoading: false,
  employerDeleteLoading: false,
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
    builder.addCase(createEmployer.rejected, (state, { payload: error }) => {
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
    builder.addCase(
      getEmployersProfileInfo.fulfilled,
      (state, { payload: employersProfile }: PayloadAction<EmployerInfoApi>) => {
        state.employersProfileLoading = false;
        state.employersProfile = employersProfile;
      },
    );
    builder.addCase(getEmployersProfileInfo.rejected, (state) => {
      state.employersProfileLoading = false;
    });
    builder.addCase(updateStatusEmployer.pending, (state) => {
      state.employerUpdateLoading = true;
    });
    builder.addCase(updateStatusEmployer.fulfilled, (state) => {
      state.employerUpdateLoading = false;
    });
    builder.addCase(updateStatusEmployer.rejected, (state) => {
      state.employerUpdateLoading = false;
    });
    builder.addCase(deleteEmployer.pending, (state) => {
      state.employerDeleteLoading = true;
    });
    builder.addCase(deleteEmployer.fulfilled, (state) => {
      state.employerDeleteLoading = false;
    });
    builder.addCase(deleteEmployer.rejected, (state) => {
      state.employerDeleteLoading = false;
    });
  },
});

export const employerReducer = employerSlice.reducer;
export const selectEmployers = (state: RootState) => state.employerAdmin.employers;
export const selectEmployerLoading = (state: RootState) => state.employerAdmin.employersLoading;
export const selectEmployerError = (state: RootState) => state.employerAdmin.employerError;
export const selectEmployersProfileInfo = (state: RootState) => state.employerAdmin.employersProfile;
export const selectEmployersProfileLoading = (state: RootState) => state.employerAdmin.employersProfileLoading;
export const selectEmployerUpdateLoading = (state: RootState) => state.employerAdmin.employerUpdateLoading;
export const selectEmployerDeleteLoading = (state: RootState) => state.employerAdmin.employerDeleteLoading;