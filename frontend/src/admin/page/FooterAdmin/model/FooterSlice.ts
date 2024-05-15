import { IFooter, IFooterLinks } from '../../../../shared/types';
import { createSlice } from '@reduxjs/toolkit';
import { createFooterLinks, deleteFooterLink, fetchFooterData } from '../api/FooterThunk';
import { RootState } from '../../../../app/store/store';

interface FooterState {
	footer: IFooter[];
	footerLinks: IFooterLinks[];
	fetchLoading: boolean;
	createFooterLinks: boolean;
	deleteFooterLinks: boolean | string;
}

const initialState: FooterState = {
	footer: [],
	footerLinks: [],
	fetchLoading: false,
	createFooterLinks: false,
	deleteFooterLinks: false
};

export const FooterSlice = createSlice({
	name: 'footer',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFooterData.pending, (state) => {
			state.fetchLoading = true;
		});
		
		builder.addCase(fetchFooterData.fulfilled, (state, { payload: footer }) => {
			state.fetchLoading = false;
			state.footer = footer;
		});
		
		builder.addCase(fetchFooterData.rejected, (state) => {
			state.fetchLoading = false;
		});
		
		builder.addCase(createFooterLinks.pending, (state) => {
			state.createFooterLinks = true;
		});
		
		builder.addCase(createFooterLinks.fulfilled, (state) => {
			state.createFooterLinks = false;
		});
		
		builder.addCase(createFooterLinks.rejected, (state) => {
			state.createFooterLinks = false;
		});
		
		builder.addCase(deleteFooterLink.pending, (state, action) => {
			state.deleteFooterLinks = action.meta.arg;
		});
		builder.addCase(deleteFooterLink.fulfilled, (state) => {
			state.deleteFooterLinks = false;
		});
		builder.addCase(deleteFooterLink.rejected, (state) => {
			state.deleteFooterLinks = true;
		});
	}
});


export const footerReducer = FooterSlice.reducer;
export const selectFooter = (state: RootState) => state.footer.footer;
export const selectFooterLinks = (state: RootState) => state.footer.footerLinks;
export const selectCreateFooterLinks = (state: RootState) => state.footer.createFooterLinks;
export const selectDeleteLoading = (state: RootState) => state.footer.deleteFooterLinks;