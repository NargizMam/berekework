import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store/store';
import { EmployerInfoApi } from '../../../../types';
import { getEmployersProfileInfo } from '../app/employerProfileThunk';


interface VacancyState {
  employersProfile: EmployerInfoApi | null;
  employersProfileLoading: boolean;
}

const initialState: VacancyState = {
  employersProfile: null,
  employersProfileLoading: false,
};

const employersProfileSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

export const employersProfileReducer = employersProfileSlice.reducer;
export const selectEmployersProfileInfo = (state: RootState) => state.employer.employersProfile;
export const selectEmployersProfileLoading = (state: RootState) => state.employer.employersProfileLoading;
