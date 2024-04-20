import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "../../../app/store/store";
import {Company} from "../../HeadingAdmin/model/types";
import {getCompanyInfo} from "../api/AdminMainPageThunk";


interface HeadingState {
    company: Company | null;
    fetching: boolean;
}

const initialState: HeadingState = {
    company: null,
    fetching: false,
};

export const adminMainPageSlice = createSlice({
    name: 'adminMainPage',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCompanyInfo.pending, (state) => {
            state.fetching = true;
        });
        builder.addCase(getCompanyInfo.fulfilled, (state, {payload: company}) => {
            state.company = company;
            state.fetching = false;
        });
        builder.addCase(getCompanyInfo.rejected, (state) => {
            state.fetching = false;
        });
    },
});

export const adminMainPageReducer = adminMainPageSlice.reducer;
export const selectCompanyInfo = (state: RootState) => state.adminMainPage.company;
