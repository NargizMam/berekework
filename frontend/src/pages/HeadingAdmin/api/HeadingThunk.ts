import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { HeadingFields } from '../model/HeadingSlice';
import { Heading, HeadingMutation } from '../model/types';

export const createHeadingDraft = createAsyncThunk<HeadingFields>(
  'headings/createHeadingDraft',
  async () => {
    const fields = await axiosApi.post('/heading/draft');
    return fields.data;
  },
);

export const createHeading = createAsyncThunk<void, HeadingMutation>(
  'headings/createHeading',
  async (heading) => {
    const formData = new FormData();
    formData.append('title', heading.title);
    if (heading.location) {
      formData.append('location', heading.location);
    }
    if (heading.description) {
      formData.append('description', heading.description);
    }
    if (heading.image) {
      formData.append('image', heading.image);
    }
    await axiosApi.post('/heading', formData);
  }
);

export const getAllHeading = createAsyncThunk<Heading[]>(
  'headings/getAllHeading',
  async () => {
    const result = await axiosApi.get<Heading[]>('/heading');
    return result.data;
  }
);

export const getSingleHeading = createAsyncThunk<Heading, string>(
  'headings/getSingleHeading',
  async (location) => {
    const result = await axiosApi.get<Heading>(`/heading/${location}`);
    return result.data;
  }
);

interface updateHeading {
  id: string;
  heading: HeadingMutation;
}

export const updateHeading = createAsyncThunk<void, updateHeading>(
  'heading/updateHeading',
  async ({id, heading}) => {
    try {
      const formData = new FormData();
      formData.append('title', heading.title);
      if (heading.location) {
        formData.append('location', heading.location);
      }
      if (heading.description) {
        formData.append('description', heading.description);
      }
      if (heading.image) {
        formData.append('image', heading.image);
      }
      await axiosApi.patch(`/heading/${id}`, formData);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteHeading = createAsyncThunk<void, string>(
  'heading/deleteHeading',
  async (id) => {
    await axiosApi.delete(`/heading/${id}`);
  }
);