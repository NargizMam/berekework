import { AuthResponse, GlobalError, User, ValidationError } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { googleAuth, login, register, registerEmployer } from '../api/AuthThunk';
import { RootState } from '../../../../app/store/store';
import { EmployerInfoApi } from '../../../../types';

interface AuthState {
  user: User | null;
  employer: EmployerInfoApi | null;
  registerLoading: boolean;
  loginLoading: boolean;
  registerError: ValidationError | null;
  loginError: GlobalError | null;
}

const initialState: AuthState = {
  user: null,
  employer: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state, {payload: data}: PayloadAction<AuthResponse>) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(registerEmployer.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(registerEmployer.fulfilled, (state, {payload: data}: PayloadAction<AuthResponse>) => {
      state.registerLoading = false;
      state.employer = data.employer;
      console.log(data);
    });
    builder.addCase(registerEmployer.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(googleAuth.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(googleAuth.fulfilled, (state, {payload: data}) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(googleAuth.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: data }: PayloadAction<AuthResponse>) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  }
});

export const authReducer = authSlice.reducer;
export const {unsetUser} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectEmployer = (state: RootState) => state.auth.employer;
export const selectRegisterLoading = (state: RootState) => state.auth.registerLoading;
export const selectRegisterError = (state: RootState) => state.auth.registerError;
export const selectLoginLoading = (state: RootState) => state.auth.loginLoading;
export const selectLoginError = (state: RootState) => state.auth.loginError;