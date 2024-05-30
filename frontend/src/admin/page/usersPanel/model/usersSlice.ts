import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllUser } from '../api/usersThunk';
import { RootState } from '../../../../app/store/store';

export interface User {
  _id: string;
  email: string;
  role: string;
  avatar?: string;
  name?: string;
  surname?: string;
  patronymic?: string;
  gender?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  education?: string;
  aboutMe?: string;
  workExperience?: {
    fieldOfWork: string;
    duration: string;
  };
  preferredJob?: string;
  preferredCity?: string;
  contacts?: {
    phone?: string;
    whatsapp?: string;
    telegram?: string;
  };
  documents?: string[];
}

interface UsersState {
  users: User[];
  usersLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  usersLoading: false,
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
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.usersLoading;
