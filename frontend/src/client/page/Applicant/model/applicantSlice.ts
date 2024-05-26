import { createSlice } from '@reduxjs/toolkit';
import { Applicant } from '../types';
import { activateApplicant, addApplicant, deleteApplicant, fetchApplicant, fetchApplicants } from './applicantThunk';
import { RootState } from '../../../../app/store/store';


interface ApplicantState {
  items: Applicant[] ;
  item: Applicant [];
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  deletedLoading: boolean;
  activatedLoading: boolean;
}

const initialState: ApplicantState = {
  items: [],
  item: [],
  fetchAllLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  deletedLoading: false,
  activatedLoading: false,
};

export const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApplicants.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchApplicants.fulfilled, (state, {payload: data}) => {
      state.fetchAllLoading = false;
      state.items = data;
    });
    builder.addCase(fetchApplicants.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchApplicant.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchApplicant.fulfilled, (state, {payload: data}) => {
      state.fetchOneLoading = false;
      state.item = data;
    });
    builder.addCase(fetchApplicant.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(addApplicant.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(addApplicant.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(addApplicant.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteApplicant.pending, (state) => {
      state.deletedLoading = true;
    });
    builder.addCase(deleteApplicant.fulfilled, (state) => {
      state.deletedLoading = false;
    });
    builder.addCase(deleteApplicant.rejected, (state) => {
      state.deletedLoading = false;
    });

    builder.addCase(activateApplicant.pending, (state) => {
      state.activatedLoading = true;
    });
    builder.addCase(activateApplicant.fulfilled, (state) => {
      state.activatedLoading = false;
    });
    builder.addCase(activateApplicant.rejected, (state) => {
      state.activatedLoading = false;
    });
  },
});

export const applicantReducer = applicantSlice.reducer;
export const selectApplicants = (state: RootState) => state.applicant.items;
export const selectOneApplicant = (state: RootState) => state.applicant.item;
export const selectApplicantsLoading = (state: RootState) => state.applicant.fetchAllLoading;
export const selectOneApplicantLoading = (state: RootState) => state.applicant.fetchOneLoading;
export const selectApplicantCreating = (state: RootState) => state.applicant.createLoading;
export const selectApplicantDeleting = (state: RootState) => state.applicant.deletedLoading;
export const selectApplicantActivated = (state: RootState) => state.applicant.activatedLoading;

