// import { Header } from '../../../types';
// import { createSlice } from '@reduxjs/toolkit';
// import { fetchHeader } from '../../../admin/page/headerCreate/api/headerThunks';
// import { RootState } from '../../../app/store/store';
//
//
// interface HeaderState {
//   items: Header | null;
//   fetching: boolean;
// }
//
// const initialState: HeaderState = {
//   items: null,
//   fetching: false,
// };
//
// export const headerSlice = createSlice({
//   name: 'albums',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchHeader.pending, (state) => {
//       state.fetching = true;
//     });
//     builder.addCase(fetchHeader.fulfilled, (state, { payload: albums }) => {
//       state.fetching = false;
//       state.items = albums;
//     });
//     builder.addCase(fetchHeader.rejected, (state) => {
//       state.fetching = false;
//     });
//   },
// });
//
// export const headerReducer = headerSlice.reducer;
// export const selectHeaderInfo = (state: RootState) => state.header.items;
