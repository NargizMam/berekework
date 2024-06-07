import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';

//Создание новой заявки на вакансии
export const sendReplyByUser = createAsyncThunk<void, { vacancyId: string; userId?: string }>(
  'application/createByUser',
  async ({ vacancyId, userId }, { rejectWithValue }) => {
    try {
      const url = userId ? `/applications/${vacancyId}/${userId}` : `/applications/${vacancyId}`;
      await axiosApi.post(url);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Получение всех заявок
export const getReplyByUser = createAsyncThunk('application/getAll', async () => {
  const response = await axiosApi.get('/applications/');
  return response.data;
});

//Получение всех заявок для конкретной вакансии
export const getCandidateByEmployer = createAsyncThunk<[], string>('application/getSingleVacation', async (id) => {
  const response = await axiosApi.get(`/applications/${id}`);
  return response.data;
});

interface UpdateStatus {
  id: string;
  userStatus?: string;
  employerStatus?: string;
}

export const updateApplication = createAsyncThunk<void, UpdateStatus>(
  'application/updateStatus',
  async ({ id, userStatus, employerStatus }) => {
    const data = userStatus ? { userStatus } : { employerStatus };
    console.log(data);
    await axiosApi.patch(`/applications/${id}`, data);
  },
);

export const deleteReply = createAsyncThunk<void, string>('application/delete', async (id) => {
  await axiosApi.delete(`/applications/${id}`);
});
