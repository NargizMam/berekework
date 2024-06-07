import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';

//Создание новой заявки на вакансию соискателем или работодателем
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

// Получение всех заявок соискателем, работодателем, админом
export const getReplyByUser = createAsyncThunk('application/getAll', async () => {
  const response = await axiosApi.get('/applications/');
  return response.data;
});

//Получение всех заявок для конкретной вакансии, по id вакансии. Доступ у работодателя и админа
export const getCandidateByEmployer = createAsyncThunk<[], string>('application/getSingleVacation', async (id) => {
  const response = await axiosApi.get(`/applications/${id}`);
  return response.data;
});

// Обновление статуса заявки соискателем или работодателем
export const updateApplicationStatus = createAsyncThunk<
  void,
  { id: string; userStatus?: string; employerStatus?: string }
>('application/updateStatus', async ({ id, userStatus, employerStatus }) => {
  const data = userStatus ? { userStatus } : { employerStatus };
  console.log(data);
  await axiosApi.patch(`/applications/${id}`, data);
});

// Для удаления заявки и обновления статуса на "Отклонен"
export const deleteApplication = createAsyncThunk<void, string>('application/delete', async (id) => {
  await axiosApi.delete(`/applications/${id}`);
});
