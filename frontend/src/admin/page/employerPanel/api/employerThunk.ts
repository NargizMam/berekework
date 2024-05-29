import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { Employer, EmployerMutation } from '../model/types';
import { ValidationError } from '../../../../types';
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
    if(employer.document) {
      formData.append('document', employer.document);
    }
    if(employer.logo) {
      formData.append('logo', employer.logo);
    }
    formData.append('contacts', '+99021312331');
    await axiosApi.post('/employer', formData);
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

export const deleteEmployer = createAsyncThunk<void, string>('employer/delete', async (id) => {
  await axiosApi.delete(`/employer/${id}`);
});
