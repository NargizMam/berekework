import {createAsyncThunk} from '@reduxjs/toolkit';
import { Applicant, ApplicantMutation } from '../types';
import axiosApi from '../../../../app/axiosApi';

export const fetchApplicants = createAsyncThunk<Applicant[] >(
  'applicant/fetchAll',
  async () => {
    const response = await axiosApi.get<Applicant[]>(`/applicants`);
    return response.data;
  }
);

export const fetchApplicant = createAsyncThunk<Applicant[], string>(
  'applicant/fetchOne',
  async (userId) => {
    const response = await axiosApi.get<Applicant[]>(`applicants?userId=${userId}` );
    return response.data;
  }
);

export const addApplicant = createAsyncThunk<null, { applicantMutation: ApplicantMutation; userId?: string | null }>(
  'applicant/add',
  async ({ applicantMutation, userId }) => {
    const formData = new FormData();

    Object.entries(applicantMutation).forEach(([key, value]) => {
      if (key === 'workExperience') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    return axiosApi.post(userId ? `applicants?userId=${userId}` : '/applicants', formData);
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

