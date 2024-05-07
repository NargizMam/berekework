import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { cities } from '../model/cities';
import CreateVacancyFormStyle from './CreateVacancyForm-style';
import { ICreateVacancyForm } from '../model/types';
import './CreateVacancyForm.css';




export const CreateVacancyForm = () => {
  const [state, setState] = useState<ICreateVacancyForm>({ title: '', minSalary: '', maxSalary: '', city: '' });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    
  };

  return (
    <Box component={'form'} onSubmit={submitHandler} className='CreateVacancyForm'>
      <div>
        <label className="labelForField" htmlFor="title">
          <Typography sx={CreateVacancyFormStyle.lable}>Название вакансии</Typography>
        </label>
        <input className="field" id="title" name="title" onChange={inputChangeHandler} value={state.title} required />
      </div>
      <section className='salarySection'>
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
        <label className="labelForField" htmlFor="city">
          <Typography sx={CreateVacancyFormStyle.lable}>Город</Typography>
        </label>
        <span className="selectWrapper">
          <select className="field" id="city" name="city" onChange={inputChangeHandler} value={state.city} required>
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
      <LoadingButton className="sendBtn" type="submit" color="primary" variant="contained" loading={false}>
        <Typography>Сохранить</Typography>
      </LoadingButton>
    </Box>
  );
};
