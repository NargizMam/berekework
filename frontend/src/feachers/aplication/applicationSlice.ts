import { createSlice } from '@reduxjs/toolkit';
import { getCandidateByEmployer, getReplyByUser } from './aplicationThunk';
import { RootState } from '../../app/store/store';
import { Vacancy } from '../../client/widgets/createVacancyForm/model/types';
import { User } from '../../app/types';

interface Reply {
  _id: string;
  createdAt: string;
  status: string;
  updatedAt: string;
  user: string;
  vacancy: Vacancy;
}

interface Candidate {
  _id: string;
  createdAt: string;
  status: string;
  updatedAt: string;
  user: User;
}

interface ApplicationState {
  replies: Reply[];
  candidates: Candidate[];
  candidatesLoading: boolean;
  repliesLoading: boolean;
}

const initialState: ApplicationState = {
  replies: [],
  candidates: [],
  candidatesLoading: false,
  repliesLoading: false,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReplyByUser.pending, (state) => {
      state.repliesLoading = true;
    });
    builder.addCase(getReplyByUser.fulfilled, (state, { payload: replies }) => {
      state.repliesLoading = false;
      state.replies = replies;
    });
    builder.addCase(getReplyByUser.rejected, (state) => {
      state.repliesLoading = false;
    });
    builder.addCase(getCandidateByEmployer.pending, (state) => {
      state.candidatesLoading = true;
    });
    builder.addCase(getCandidateByEmployer.fulfilled, (state, { payload: candidates }) => {
      state.candidatesLoading = false;
      state.candidates = candidates;
    });
    builder.addCase(getCandidateByEmployer.rejected, (state) => {
      state.candidatesLoading = false;
    });
  },
});

export const applicationReducer = applicationSlice.reducer;
export const selectReplies = (state: RootState) => state.application.replies;
export const selectRepliesLoading = (state: RootState) => state.application.repliesLoading;
export const selectCandidates = (state: RootState) => state.application.candidates;
export const selectCandidatesLoading = (state: RootState) => state.application.candidatesLoading;
