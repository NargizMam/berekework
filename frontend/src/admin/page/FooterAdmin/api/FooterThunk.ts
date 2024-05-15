import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../../../app/axiosApi';
import { IContactsBlock, IFooterLinks } from '../../../../shared/types';

export const fetchFooterData = createAsyncThunk(
	'footer/fetchFooterData',
	async () => {
		const response = await axiosApi.get('/footer');
		return response.data;
	}
);

export const createFooterLinks = createAsyncThunk(
	'footer/addFooterLinks',
	async (links: IFooterLinks, { rejectWithValue }) => {
		try {
			const data = {
				title: links.title,
				links: links.links
			};
			
			const response = await axiosApi.post('/footer/new-links', data);
			
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createContactsBLock = createAsyncThunk(
	'footer/addContactsBLock',
	async (contactsBlock: IContactsBlock, { rejectWithValue }) => {
		try {
			const data = {
				title: contactsBlock.title,
				contactsDetailsArr: contactsBlock.contactsDetailsArr
			};
			
			const response = await axiosApi.post('/footer/new-contacts-block', data);
			
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const editContactsBlock = createAsyncThunk(
	'footer/editContactsBlock',
	async (contactsBlock: IContactsBlock, { rejectWithValue }) => {
		try {
			const data = {
				title: contactsBlock.title,
				links: contactsBlock.contactsDetailsArr
			};
			
			const response = await axiosApi.put('/footer/edit-contacts', data);
			
			return response.data;
		} catch (error) {
			if (isAxiosError(error) && error.response) {
				return rejectWithValue(error.response.data);
			}
			return rejectWithValue(error);
		}
	}
);

export const deleteFooterLink = createAsyncThunk(
	'footer/deleteFooterLink',
	async (linkId: string, { rejectWithValue }) => {
		try {
			const response = await axiosApi.delete(`/footer/footerLinks/${linkId}`);
			return response.data;
		} catch (e) {
			if (isAxiosError(e) && e.response && e.response.status === 400) {
				return rejectWithValue(e.response.data);
			}
			throw e;
		}
	}
);

export const createCopyright = createAsyncThunk(
	'footer/addCopyright',
	async (text: string, { rejectWithValue, dispatch }) => {
		try {
			const response = await axiosApi.post('/footer/new-copyright', { text });
			await dispatch(fetchFooterData());
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteCopyright = createAsyncThunk(
	'footer/deleteCopyright',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			await axiosApi.delete('/footer/copyright');
			await dispatch(fetchFooterData());
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createLogo = createAsyncThunk(
	'footer/createLogo',
	async (logoFormData: FormData, { rejectWithValue }) => {
		try {
			const response = await axiosApi.post('/footer/logo', logoFormData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteLogo = createAsyncThunk(
	'footer/deleteLogo',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosApi.delete('/footer/logo');
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
