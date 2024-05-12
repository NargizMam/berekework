import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { countries, educationTypes, workTypes } from '../model/constants';
import CreateVacancyFormStyle from './CreateVacancyForm-style';
import { ICreateVacancyForm, Vacancy } from '../model/types';
import TextAriaField from '../../textAriaField/ui/TextAriaField';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectError, selectIsLoading } from '../model/createVacancyFormSlice';
import { postVacancy } from '../model/createVacancyFormThuncks';
import { Loader } from '../../../../shared/loader/ui/Loader';
import './CreateVacancyForm.css';

interface Flag {
  aboutVacancy: boolean;
  responsibilities: boolean;
  workConditions: boolean;
}

export const CreateVacancyForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const [cities, setCities] = useState<string[]>([]);

  const [state, setState] = useState<ICreateVacancyForm>({
    vacancyTitle: '',
    aboutVacancy: '',
    responsibilities: '',
    workConditions: '',
    country: '',
    city: '',
    fieldOfWork: '',
    minAge: '',
    maxAge: '',
    minSalary: '',
    maxSalary: '',
    education: '',
    employmentType: '',
  });

  const [isFull, setIsFull] = useState<Flag>({
    aboutVacancy: true,
    responsibilities: true,
    workConditions: true,
  });

  const [isDesabled, setIsDesabled] = useState(isFull.aboutVacancy && isFull.responsibilities && isFull.workConditions);

  useEffect(() => {
    if (!isFull.aboutVacancy && !isFull.responsibilities && !isFull.workConditions) {
      setIsDesabled(isFull.aboutVacancy && isFull.responsibilities && isFull.workConditions);
    } else {
      setIsDesabled(true);
    }
  });

  const inputChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'country') {
      const index = countries.findIndex((item) => item.name === value);
      if (index >= 0) {
        setCities(countries[index].cities);
      }
    }
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const textareaChangeHandler = (name: string, value: string) => {
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const changeFlag = (name: string, flag: boolean) => {
    setIsFull((prev) => {
      return { ...prev, [name]: flag };
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const createData: Vacancy = {
      vacancyTitle: state.vacancyTitle,
      aboutVacancy: state.aboutVacancy,
      responsibilities: state.responsibilities,
      workConditions: state.workConditions,
      country: state.country,
      city: state.city,
      fieldOfWork: state.fieldOfWork,
      salary: {
        minSalary: parseFloat(state.minSalary),
        maxSalary: parseFloat(state.maxSalary),
      },
      age: {
        minAge: parseFloat(state.minAge),
        maxAge: parseFloat(state.maxAge),
      },
      education: state.education,
      employmentType: state.employmentType,
    };
    dispatch(postVacancy(createData));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="CreateVacancyForm">
            <div>
              <label className="labelForField" htmlFor="vacancyTitle">
                <Typography sx={CreateVacancyFormStyle.lable}>Название вакансии</Typography>
              </label>
              <input
                className="field"
                id="vacancyTitle"
                name="vacancyTitle"
                onChange={inputChangeHandler}
                value={state.vacancyTitle}
                required
              />
            </div>
            <TextAriaField
              labelTitle="О вакансии"
              labelClassName="labelForField"
              fieldClassName="field"
              name="aboutVacancy"
              value={state.aboutVacancy}
              onChange={textareaChangeHandler}
              minSub={200}
              sx={CreateVacancyFormStyle.lable}
              required
              changeFlag={changeFlag}
            />
            <TextAriaField
              labelTitle="Обязанности"
              labelClassName="labelForField"
              fieldClassName="field"
              name="responsibilities"
              value={state.responsibilities}
              onChange={textareaChangeHandler}
              minSub={150}
              sx={CreateVacancyFormStyle.lable}
              required
              changeFlag={changeFlag}
            />
            <TextAriaField
              labelTitle="Условия работы"
              labelClassName="labelForField"
              fieldClassName="field"
              name="workConditions"
              value={state.workConditions}
              onChange={textareaChangeHandler}
              minSub={100}
              sx={CreateVacancyFormStyle.lable}
              required
              changeFlag={changeFlag}
            />
            <div>
              <label className="labelForField" htmlFor="cicountrytcountryy">
                <Typography sx={CreateVacancyFormStyle.lable}>Страна</Typography>
              </label>
              <span className="selectWrapper">
                <select
                  className="field"
                  id="country"
                  name="country"
                  onChange={inputChangeHandler}
                  value={state.country}
                  required
                >
                  <option className="menuItem" value="">
                    Не указан
                  </option>
                  {countries.map((country, index) => (
                    <option key={index} className="menuItem" value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.9995 16.8C11.2995 16.8 10.5995 16.53 10.0695 16L3.54953 9.48001C3.25953 9.19001 3.25953 8.71001 3.54953 8.42001C3.83953 8.13001 4.31953 8.13001 4.60953 8.42001L11.1295 14.94C11.6095 15.42 12.3895 15.42 12.8695 14.94L19.3895 8.42001C19.6795 8.13001 20.1595 8.13001 20.4495 8.42001C20.7395 8.71001 20.7395 9.19001 20.4495 9.48001L13.9295 16C13.3995 16.53 12.6995 16.8 11.9995 16.8Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </span>
            </div>
            <div>
              <label className="labelForField" htmlFor="city">
                <Typography sx={CreateVacancyFormStyle.lable}>Город</Typography>
              </label>
              <span className="selectWrapper">
                <select
                  className="field"
                  id="city"
                  name="city"
                  onChange={inputChangeHandler}
                  value={state.city}
                  required
                >
                  <option className="menuItem" value="">
                    Не указан
                  </option>
                  {cities.map((city, index) => (
                    <option key={index} className="menuItem" value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.9995 16.8C11.2995 16.8 10.5995 16.53 10.0695 16L3.54953 9.48001C3.25953 9.19001 3.25953 8.71001 3.54953 8.42001C3.83953 8.13001 4.31953 8.13001 4.60953 8.42001L11.1295 14.94C11.6095 15.42 12.3895 15.42 12.8695 14.94L19.3895 8.42001C19.6795 8.13001 20.1595 8.13001 20.4495 8.42001C20.7395 8.71001 20.7395 9.19001 20.4495 9.48001L13.9295 16C13.3995 16.53 12.6995 16.8 11.9995 16.8Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </span>
            </div>
            <div>
              <label className="labelForField" htmlFor="fieldOfWork">
                <Typography sx={CreateVacancyFormStyle.lable}>Сфера деятельности</Typography>
              </label>
              <input
                className="field"
                id="fieldOfWork"
                name="fieldOfWork"
                onChange={inputChangeHandler}
                value={state.fieldOfWork}
                required
              />
            </div>
            <section className="dableSection">
              <div>
                <label className="labelForField" htmlFor="minAge">
                  <Typography sx={CreateVacancyFormStyle.lable}>Минимальный возраст</Typography>
                </label>
                <input
                  className="field"
                  id="minAge"
                  name="minAge"
                  type="number"
                  onChange={inputChangeHandler}
                  value={state.minAge}
                />
              </div>
              <div>
                <label className="labelForField" htmlFor="maxAge">
                  <Typography sx={CreateVacancyFormStyle.lable}>Максимальный возраст</Typography>
                </label>
                <input
                  className="field"
                  id="maxAge"
                  name="maxAge"
                  type="number"
                  onChange={inputChangeHandler}
                  value={state.maxAge}
                />
              </div>
            </section>
            <section className="dableSection">
              <div>
                <label className="labelForField" htmlFor="minSalary">
                  <Typography sx={CreateVacancyFormStyle.lable}>Минимальная зарплата</Typography>
                </label>
                <input
                  className="field"
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  onChange={inputChangeHandler}
                  value={state.minSalary}
                />
              </div>
              <div>
                <label className="labelForField" htmlFor="maxSalary">
                  <Typography sx={CreateVacancyFormStyle.lable}>Максимальная зарплата</Typography>
                </label>
                <input
                  className="field"
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  onChange={inputChangeHandler}
                  value={state.maxSalary}
                />
              </div>
            </section>
            <div>
              <label className="labelForField" htmlFor="education">
                <Typography sx={CreateVacancyFormStyle.lable}>Образование</Typography>
              </label>
              <span className="selectWrapper">
                <select
                  className="field"
                  id="education"
                  name="education"
                  onChange={inputChangeHandler}
                  value={state.education}
                  required
                >
                  <option className="menuItem" value="">
                    Не указан
                  </option>
                  {educationTypes.map((education, index) => (
                    <option key={index} className="menuItem" value={education}>
                      {education}
                    </option>
                  ))}
                </select>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.9995 16.8C11.2995 16.8 10.5995 16.53 10.0695 16L3.54953 9.48001C3.25953 9.19001 3.25953 8.71001 3.54953 8.42001C3.83953 8.13001 4.31953 8.13001 4.60953 8.42001L11.1295 14.94C11.6095 15.42 12.3895 15.42 12.8695 14.94L19.3895 8.42001C19.6795 8.13001 20.1595 8.13001 20.4495 8.42001C20.7395 8.71001 20.7395 9.19001 20.4495 9.48001L13.9295 16C13.3995 16.53 12.6995 16.8 11.9995 16.8Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </span>
            </div>
            <div>
              <label className="labelForField" htmlFor="employmentType">
                <Typography sx={CreateVacancyFormStyle.lable}>Тип занятости</Typography>
              </label>
              <span className="selectWrapper">
                <select
                  className="field"
                  id="employmentType"
                  name="employmentType"
                  onChange={inputChangeHandler}
                  value={state.employmentType}
                  required
                >
                  <option className="menuItem" value="">
                    Не указан
                  </option>
                  {workTypes.map((type, index) => (
                    <option key={index} className="menuItem" value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.9995 16.8C11.2995 16.8 10.5995 16.53 10.0695 16L3.54953 9.48001C3.25953 9.19001 3.25953 8.71001 3.54953 8.42001C3.83953 8.13001 4.31953 8.13001 4.60953 8.42001L11.1295 14.94C11.6095 15.42 12.3895 15.42 12.8695 14.94L19.3895 8.42001C19.6795 8.13001 20.1595 8.13001 20.4495 8.42001C20.7395 8.71001 20.7395 9.19001 20.4495 9.48001L13.9295 16C13.3995 16.53 12.6995 16.8 11.9995 16.8Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </span>
            </div>
            <LoadingButton
              className="sendBtn"
              type="submit"
              color="primary"
              variant="contained"
              loading={isLoading}
              disabled={isDesabled}
            >
              <Typography>Сохранить</Typography>
            </LoadingButton>
          </div>
        </form>
      )}
    </>
  );
};
