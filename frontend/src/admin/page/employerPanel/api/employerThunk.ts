import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { Employer, EmployerMutation } from '../model/types';
import { EmployerInfoApi, ValidationError } from '../../../../types';
import { isAxiosError } from 'axios';
import { EmployerInfoApiMutation } from '../../../../client/page/employerProfile/ui/EmployerEdit';

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
    if (employer.document) {
      formData.append('document', employer.document);
    }
    if (employer.avatar) {
      formData.append('avatar', employer.avatar);
    }
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

export const getEmployersProfileInfo = createAsyncThunk<EmployerInfoApi, string>(
  'employersProfile/getInfo',
  async (id) => {
    const response = await axiosApi.get(`/employer/${id}`);
    return response.data;
  },
);

interface UpdateStatusEmployer {
  id: string;
  email: string;
  tariff: string;
}

export const updateStatusEmployer = createAsyncThunk<void, UpdateStatusEmployer>(
  'employer/updateStatus',
  async ({ id, email, tariff }) => {
    await axiosApi.patch(`/employer/${id}`, { email, tariff });
  },
);

export const updateEmployer = createAsyncThunk<
  void,
  {
    id: string;
    data: EmployerInfoApiMutation;
  },
  {
    rejectValue: ValidationError;
  }
>('employer/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    console.log(data.avatar);
    const formData = new FormData();
    formData.append('companyName', data.companyName);
    formData.append('industry', data.industry);
    formData.append('description', data.description);
    formData.append('foundationYear', data.foundationYear);
    formData.append('address', data.address);
    formData.append('contacts', data.contacts);
    if (data.avatar) {
      formData.append('avatar', data.avatar);
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

interface DeleteEmployer {
  id: string;
  email: string;
}

export const deleteEmployer = createAsyncThunk<void, DeleteEmployer>('employer/delete', async ({ id, email }) => {
  await axiosApi.post(`/employer/${id}`, { email });
});
