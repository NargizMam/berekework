import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllUser, getSingleUser } from './usersThunk';
import { RootState } from '../../app/store/store';
import { User } from '../../app/types';

interface UsersState {
  users: User[];
  user: User | null;
  usersLoading: boolean;
  userLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  user: null,
  usersLoading: false,
  userLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUser.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getAllUser.fulfilled, (state, { payload: users }: PayloadAction<User[]>) => {
      state.usersLoading = false;
      state.users = users;
    });
    builder.addCase(getAllUser.rejected, (state) => {
      state.usersLoading = false;
    });
    builder.addCase(getSingleUser.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getSingleUser.fulfilled, (state, { payload: user }: PayloadAction<User>) => {
      state.usersLoading = false;
      state.user = user;
    });
    builder.addCase(getSingleUser.rejected, (state) => {
      state.usersLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUsers = (state: RootState) => state.users.users;
export const selectProfile = (state: RootState) => state.users.user;
export const selectUsersLoading = (state: RootState) => state.users.usersLoading;
export const selectProfileLoading = (state: RootState) => state.users.userLoading;
