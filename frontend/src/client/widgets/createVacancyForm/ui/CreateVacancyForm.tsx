import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { countries, educationTypes, workTypes } from '../model/constants';
import CreateVacancyFormStyle from './CreateVacancyForm-style';
import { ICreateVacancyForm, VacancyEdtiData, VacancyMutation } from '../model/types';
import TextAriaField from '../../textAriaField/ui/TextAriaField';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { clearEditVacancy, selectError, selectIsLoading } from '../model/createVacancyFormSlice';
import { postVacancy, updateVacancy } from '../model/createVacancyFormThuncks';
import { Loader } from '../../../../shared/loader';
import './CreateVacancyForm.css';
import { openErrorMessage } from '../../../../widgets/WarningMessage/warningMessageSlice';
import ErrorMessage from '../../../../widgets/WarningMessage/ErrorMessage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getVacancyById } from '../../../../feachers/vacancy/vacancyThunk';
import { selectVacancy } from '../../../../feachers/vacancy/vacancySlice';
import { selectEmployer } from '../../../page/Auth/model/AuthSlice';

interface Flag {
  aboutVacancy: boolean;
  responsibilities: boolean;
  workConditions: boolean;
}

// const initialState = {
//   vacancyTitle: '',
//   aboutVacancy: '',
//   responsibilities: '',
//   workConditions: '',
//   country: '',
//   city: '',
//   fieldOfWork: '',
//   minAge: '',
//   maxAge: '',
//   minSalary: '',
//   maxSalary: '',
//   education: '',
//   employmentType: '',
//   employer: '',
// };

export const CreateVacancyForm = () => {
  const dispatch = useAppDispatch();
  const employer = useAppSelector(selectEmployer);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const editVacancy = useAppSelector(selectVacancy);
  const [cities, setCities] = useState<any>([]);
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
    employer: '',
  });
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const [isFull, setIsFull] = useState<Flag>({
    aboutVacancy: true,
    responsibilities: true,
    workConditions: true,
  });

  const [isDisabled, setIsDisabled] = useState(isFull.aboutVacancy && isFull.responsibilities && isFull.workConditions);

  useEffect(() => {
    if (id) {
      dispatch(getVacancyById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const editData: ICreateVacancyForm = {
      vacancyTitle: editVacancy?.vacancyTitle || '',
      aboutVacancy: editVacancy?.aboutVacancy || '',
      responsibilities: editVacancy?.responsibilities || '',
      workConditions: editVacancy?.workConditions || '',
      country: editVacancy?.country || '',
      city: editVacancy?.city || '',
      fieldOfWork: editVacancy?.fieldOfWork || '',
      minAge: editVacancy?.age.minAge.toString() || '',
      maxAge: editVacancy?.age.maxAge.toString() || '',
      minSalary: editVacancy?.salary.minSalary.toString() || '',
      maxSalary: editVacancy?.salary.maxSalary.toString() || '',
      education: editVacancy?.education,
      employmentType: editVacancy?.employmentType || '',
      employer: '',
    };
    if (id && editData) {
      setState(editData);
      dispatch(clearEditVacancy());
    } else {
      setState({
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
        employer: '',
      });
    }
  }, [editVacancy, dispatch]);

  useEffect(() => {
    if (!isFull.aboutVacancy && !isFull.responsibilities && !isFull.workConditions) {
      setIsDisabled(isFull.aboutVacancy && isFull.responsibilities && isFull.workConditions);
    } else {
      setIsDisabled(true);
    }
  }, [isFull]);

  const inputChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'country' || state.country !== '') {
      const cities = countries.map((item) => {
        if (item.name === value) {
          return item.cities;
        } else if (item.name === state.country) {
          return item.cities;
        }
      });
      
        setCities(cities[0]);
        console.log(cities[0]);
        
      
    }
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  console.log(cities);
  


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

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const stateData: VacancyMutation = {
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
    try {
      if (editVacancy && id) {
        const editData: VacancyEdtiData = {
          id: editVacancy._id,
          vacancy: stateData,
        };
        await dispatch(updateVacancy(editData)).unwrap();
        navigate(-1);
      } else {
        await dispatch(postVacancy(stateData)).unwrap();
        navigate(-1);
      }
      dispatch(clearEditVacancy());
      setState({
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
        employer: '',
      });
    } catch (e) {
      dispatch(openErrorMessage);
    }
  };

  return (
    <>
      {error && <ErrorMessage />}
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
            <section className="dableSection">
              <div>
                <label className="labelForField" htmlFor="country">
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
                    {state.country ? <option className="menuItem">{state.country}</option> : null}
                    <option className="menuItem" value="">
                      Не указан
                    </option>
                    {countries.map((country, index) => {
                      if (state.country === country.name) {
                        return null;
                      }
                      return (
                        <option key={index} className="menuItem" value={country.name}>
                          {country.name}
                        </option>
                      );
                    })}
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
                    {state.city ? <option className="menuItem">{state.city}</option> : null}
                    <option className="menuItem" value="">
                      Не указан
                    </option>
                    {cities.map((city, index) => {
                      if (city === city) {
                        return null;
                      }
                      return (
                        <option key={index} className="menuItem">
                          {city}
                        </option>
                      );
                    })}
                    {/* <option className="menuItem" value="">
                      Не указан
                    </option>
                    {cities.map((city, index) => (
                      <option key={index} className="menuItem" value={city}>
                        {city}
                      </option>
                    ))} */}
                  </select>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9995 16.8C11.2995 16.8 10.5995 16.53 10.0695 16L3.54953 9.48001C3.25953 9.19001 3.25953 8.71001 3.54953 8.42001C3.83953 8.13001 4.31953 8.13001 4.60953 8.42001L11.1295 14.94C11.6095 15.42 12.3895 15.42 12.8695 14.94L19.3895 8.42001C19.6795 8.13001 20.1595 8.13001 20.4495 8.42001C20.7395 8.71001 20.7395 9.19001 20.4495 9.48001L13.9295 16C13.3995 16.53 12.6995 16.8 11.9995 16.8Z"
                      fill="#8E8E8E"
                    />
                  </svg>
                </span>
              </div>
            </section>
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
            <section className="dableSection">
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
            </section>
            <LoadingButton
              className="sendBtn"
              type="submit"
              color="primary"
              variant="contained"
              loading={isLoading}
              disabled={isDisabled}
            >
              <Typography>Сохранить</Typography>
            </LoadingButton>
          </div>
        </form>
      )}
    </>
  );
};
