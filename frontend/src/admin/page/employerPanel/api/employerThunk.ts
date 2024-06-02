import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { Employer, EmployerMutation } from '../model/types';
import { EmployerInfoApi, ValidationError } from '../../../../types';
import { isAxiosError } from 'axios';

export const createEmployer = createAsyncThunk<
  void,
  EmployerMutation,
  {
    rejectValue: ValidationError;
  }
>('employer/create', async (employer, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('email', employer.email);
    formData.append('password', employer.password);
    formData.append('companyName', employer.companyName);
    formData.append('industry', employer.industry);
    formData.append('description', employer.description);
    formData.append('foundationYear', employer.foundationYear);
    formData.append('address', employer.address);
    formData.append('contacts', employer.contacts);
    if(employer.document) {
      formData.append('document', employer.document);
    }
    if(employer.logo) {
      formData.append('logo', employer.logo);
    }
    await axiosApi.post('/employer', formData);
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 422) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});
export const updateEmployer = createAsyncThunk<
  void,
  { id: string,
    data: EmployerMutation },
  {
    rejectValue: ValidationError;
  }
>('employer/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('email', data.email);
    if (data.password) {
      formData.append('password', data.password);
    }
    formData.append('companyName', data.companyName);
    formData.append('industry', data.industry);
    formData.append('description', data.description);
    formData.append('foundationYear', data.foundationYear);
    formData.append('address', data.address);
    formData.append('contacts', data.contacts);
    if (data.document) {
      formData.append('document', data.document);
    }
    if (data.logo) {
      formData.append('logo', data.logo);
    }
    if (data.document) {
      formData.append('document', data.document);
    }
    const response = await axiosApi.put(`/employer/${id}`, formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 422) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const getAllEmployer = createAsyncThunk<Employer[]>('employer/getAll', async () => {
  const response = await axiosApi.get<Employer[]>('/employer');
  return response.data;
});
export const getEmployersProfileInfo = createAsyncThunk<EmployerInfoApi, string>(
  'employersProfile/getInfo',
  async (id) => {
    const response = await axiosApi.get(`/employer/${id}`);
    return response.data;
  }
);

export const deleteEmployer = createAsyncThunk<void, string>('employer/delete', async (id) => {
  await axiosApi.delete(`/employer/${id}`);
});
