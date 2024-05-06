import {createAsyncThunk} from '@reduxjs/toolkit';
import { Applicant, ApplicantMutation } from '../types';
import axiosApi from '../../../app/axiosApi';

export const fetchApplicants = createAsyncThunk<Applicant[]>(
  'applicant/fetchAll',
  async () => {
    const response = await axiosApi.get<Applicant[]>(`/applicants`);
    return response.data;
  }
);

export const fetchApplicant = createAsyncThunk<Applicant, string>(
  'applicant/fetchOne',
  async (_id) => {
    const response = await axiosApi.get<Applicant>(`applicants/${_id}` );
    return response.data;
  }
);

export const addApplicant = createAsyncThunk<null, ApplicantMutation>(
  'applicant/add',
  async (applicantMutation) => {
    const formData = new FormData();

    Object.entries(applicantMutation).forEach(([key, value]) => {
      if (key === 'workExperience') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    return axiosApi.post('/applicants', formData);
  }
);

export const deleteApplicant = createAsyncThunk<null, string>(
  'applicant/delete',
  async (_id: string) => {
    await axiosApi.delete(`/applicants/${_id}`);
    return null;
  }
);

export const activateApplicant = createAsyncThunk<null, string>(
  'applicant/publish',
  async (_id: string) => {
    return await axiosApi.patch(`/applicants/${_id}/activate`);
  }
);

