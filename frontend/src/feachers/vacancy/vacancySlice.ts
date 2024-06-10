import { CategoryVacancyI, VacancyApiData, VacancyResponseToCard } from '../../app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteVacancy,
  getAllVacancy,
  getAllVacancyByKgOrAbroad, getAllVacancyToCard,
  getVacancyById,
  vacancyFetchCategory,
  vacancyGetByCategory,
} from './vacancyThunk';
import { RootState } from '../../app/store/store';

interface VacancyState {
  vacancies: VacancyApiData[];
  vacanciesToCard: VacancyResponseToCard[];
  vacancy: VacancyApiData | null;
  vacancyCategory: CategoryVacancyI[];
  vacancyCategoryLoading: boolean;
  vacanciesLoading: boolean;
  vacancyLoading: boolean;
  vacancyDeleteLoading: boolean;
}

const initialState: VacancyState = {
  vacancies: [],
  vacanciesToCard: [],
  vacancy: null,
  vacancyCategory: [],
  vacanciesLoading: false,
  vacancyLoading: false,
  vacancyCategoryLoading: false,
  vacancyDeleteLoading: false,
};

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVacancy.pending, (state) => {
      state.vacanciesLoading = true;
    });
    builder.addCase(getAllVacancy.fulfilled, (state, { payload: vacancies }: PayloadAction<VacancyApiData[]>) => {
      state.vacanciesLoading = false;
      state.vacancies = vacancies;
    });
    builder.addCase(getAllVacancy.rejected, (state) => {
      state.vacanciesLoading = false;
    });

    builder.addCase(getAllVacancyByKgOrAbroad.pending, (state) => {
      state.vacanciesLoading = true;
    });
    builder.addCase(
      getAllVacancyByKgOrAbroad.fulfilled,
      (state, { payload: vacancies }: PayloadAction<VacancyApiData[]>) => {
        state.vacanciesLoading = false;
        state.vacancies = vacancies;
      },
    );
    builder.addCase(getAllVacancyByKgOrAbroad.rejected, (state) => {
      state.vacanciesLoading = false;
    });

    builder.addCase(getVacancyById.pending, (state) => {
      state.vacancyLoading = true;
    });
    builder.addCase(getVacancyById.fulfilled, (state, { payload: vacancy }: PayloadAction<VacancyApiData>) => {
      state.vacancyLoading = false;
      state.vacancy = vacancy;
    });
    builder.addCase(getVacancyById.rejected, (state) => {
      state.vacancyLoading = false;
    });
    builder.addCase(vacancyGetByCategory.pending, (state) => {
      state.vacanciesLoading = true;
    });
    builder.addCase(vacancyGetByCategory.fulfilled, (state, { payload: vacancy }) => {
      state.vacanciesToCard = vacancy;
      state.vacanciesLoading = false;
    });
    builder.addCase(vacancyGetByCategory.rejected, (state) => {
      state.vacanciesLoading = false;
    });
    builder.addCase(vacancyFetchCategory.pending, (state) => {
      state.vacancyCategoryLoading = true;
    });
    builder.addCase(vacancyFetchCategory.fulfilled, (state, { payload }) => {
      state.vacancyCategoryLoading = false;
      state.vacancyCategory = payload;
    });
    builder.addCase(vacancyFetchCategory.rejected, (state) => {
      state.vacancyCategoryLoading = false;
    });

    builder.addCase(getAllVacancyToCard.pending, (state) => {
      state.vacanciesLoading = true;
    }).addCase(getAllVacancyToCard.fulfilled, (state, {payload}) => {
      state.vacanciesLoading = false;
      state.vacanciesToCard = payload;
    }).addCase(getAllVacancyToCard.rejected, (state) => {
      state.vacanciesLoading = false;
    });

    builder.addCase(deleteVacancy.pending, (state) => {
      state.vacancyDeleteLoading = true;
    }).addCase(deleteVacancy.fulfilled, (state) => {
      state.vacancyDeleteLoading = false;
    }).addCase(deleteVacancy.rejected, (state) => {
      state.vacancyDeleteLoading = false;
    });
  },
});

export const vacancyReducer = vacancySlice.reducer;
export const selectVacancies = (state: RootState) => state.vacancy.vacancies;
export const selectVacancy = (state: RootState) => state.vacancy.vacancy;
export const selectClientVacancyCategory = (state: RootState) => state.vacancy.vacancyCategory;
export const selectClientVacancyCategoryFetching = (state: RootState) => state.vacancy.vacancyCategoryLoading;
export const selectVacanciesLoading = (state: RootState) => state.vacancy.vacanciesLoading;
export const selectVacancyLoading = (state: RootState) => state.vacancy.vacancyLoading;
export const selectVacancyToCards = (state: RootState) => state.vacancy.vacanciesToCard;
export const selectVacancyDeleteLoading = (state: RootState) => state.vacancy.vacancyDeleteLoading;