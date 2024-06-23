import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { educationTypes, jobs } from '../../../app/constants/constant';
import { LoadingButton } from '@mui/lab';
import { UserMutation } from '../../page/Profile/model/types';
import { countries } from '../createVacancyForm/model/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  state: UserMutation;
  submitFormHandler: (e: FormEvent) => void;
  inputChangeHandler: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  addField: () => void;
  fields: ReactNode[];
  loading: boolean;
}

const Form: React.FC<Props> = ({ loading, fields, state, submitFormHandler, inputChangeHandler, addField }) => {
  const [allFieldsEmpty, setAllFieldsEmpty] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fieldsEmpty = !state.name && !state.surname && !state.patronymic && !state.gender && !state.dateOfBirth &&
      !state.country && !state.city && !state.education && !state.aboutMe && !state.preferredJob && !state.preferredCity &&
      !state.contacts?.phone && !state.contacts?.whatsapp && !state.contacts?.telegram;

    setAllFieldsEmpty(fieldsEmpty);
  }, [state]);

  return (
    <div className="applicantFormContainer">
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} autoComplete="off"
            onSubmit={submitFormHandler}>
        <div className="formContainer">
          <div className="inputContainer">
            <Grid item xs>
              <label className="labelForField" htmlFor="name">Имя</label>
              <input className="applicantField" id="name" value={state.name} onChange={inputChangeHandler} name="name"
                     required />
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="surname">Фамилия</label>
              <input className="applicantField" id="surname" value={state.surname} onChange={inputChangeHandler}
                     name="surname" required />
            </Grid>
          </div>
          <Grid item xs>
            <label className="labelForField" htmlFor="patronymic">Отчество</label>
            <input className="applicantField" id="patronymic" value={state.patronymic} onChange={inputChangeHandler}
                   name="patronymic" />
          </Grid>
          <div className="inputContainer">
            <Grid item xs={7}>
              <label className="labelForField" htmlFor="gender">Пол</label>
              <div className='select-wrapper'>
                <select className="applicantField" onChange={inputChangeHandler} id="gender" value={state.gender}
                        name="gender" required>
                  <option className="menuItem" value="">Не указан</option>
                  <option className="menuItem" value="жен">Женский</option>
                  <option className="menuItem" value="муж">Мужской</option>
                </select>
              </div>

            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="dateOfBirth">Дата рождения</label>
              <input type={'date'} className="applicantField" id="dateOfBirth" value={state.dateOfBirth}
                     onChange={inputChangeHandler} name="dateOfBirth" required min="1950-01-01"/>
            </Grid>
          </div>
          <div className="inputContainer">
            <Grid item xs>
              <label className="labelForField" htmlFor="country">Страна</label>
              <div className="select-wrapper">
                <select className="applicantField" id="country" value={state.country} onChange={inputChangeHandler}
                        name="country" required>
                  <option className="menuItem" value="">Выберите страну</option>
                  {countries.map((item, index) => (
                    <option className="menuItem" key={`country-${index}`} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="city">Город</label>
              <div className="select-wrapper">
                <select className="applicantField" id="city" value={state.city} onChange={inputChangeHandler}
                        name="city"
                        required>
                  <option className="menuItem" value="">Выберите город</option>
                  {state.city ? <option className="menuItem">{state.city}</option> : null}
                  <option className="menuItem" value="">
                    Не указан
                  </option>
                  {countries.map((country) => {
                    if (state.country === country.name) {
                      return country.cities.map((city, index) => (
                        <option key={`city-${index}`} className="menuItem">
                          {city}
                        </option>
                      ));
                    }
                    return null;
                  })}
                </select>
              </div>
            </Grid>
          </div>
          <Grid item xs>
            <label className="labelForField" htmlFor="education">Образование</label>
            <div className="select-wrapper">
              <select className="applicantField" id="education" value={state.education} onChange={inputChangeHandler}
                      name="education" required>
                <option value="">Не указано</option>
                {educationTypes.map((educationType, index) => (
                  <option key={index} value={educationType}>{educationType}</option>
                ))}
              </select>
            </div>
          </Grid>
          <Grid item xs>
          <label className="labelForField" htmlFor="aboutMe">О себе</label>
            <textarea className="applicantField" id="aboutMe" value={state.aboutMe} onChange={inputChangeHandler}
                      name="aboutMe" required />
          </Grid>
          <Grid item xs>
            <Grid item xs mb={2}>
              <Button variant="contained"
                      sx={{ marginTop: '10px', backgroundColor: '#0866FF', color: '#ffff', borderRadius: '30px', width: "250px" }}
                      onClick={addField}>
                Добавить опыт работы
              </Button>

            </Grid>
            {fields.map((field) => field)}
          </Grid>
          <div className="inputContainer">
            <Grid item xs>
              <label className="labelForField" htmlFor="preferredJob">Ищу работу в сфере:</label>
              <div className="select-wrapper">
                <select className="applicantField" id="preferredJob" value={state.preferredJob}
                        onChange={inputChangeHandler} name="preferredJob" required>
                  <option className="menuItem" value="">Выберите профессию</option>
                  {jobs.map((job) => (
                    <option key={job} value={job}>{job}</option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="preferredCity">Предпочитаемый город для работы</label>
              <div className="select-wrapper">
                <select className="applicantField" id="preferredCity" value={state.preferredCity}
                        onChange={inputChangeHandler} name="preferredCity" required>
                  <option className="menuItem" value="">Выберите город</option>
                  {countries.map((country) => (
                    country.cities.map((city, index) => (
                      <option key={`preferred-city-${index}`} className="menuItem">
                        {city}
                      </option>
                    ))
                  ))}
                </select>
              </div>
            </Grid>
          </div>
          <div className="inputContainer">
            <Grid item xs>
              <label className="labelForField" htmlFor="phone">Номер телефона</label>
              <input className="applicantField" id="phone" value={state.contacts?.phone} onChange={inputChangeHandler}
                     name="phone" required />
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="whatsapp">WhatsApp</label>
              <input className="applicantField" id="whatsapp" value={state.contacts?.whatsapp}
                     onChange={inputChangeHandler} name="whatsapp" />
            </Grid>
          </div>
          <Grid item xs>
            <label className="labelForField" htmlFor="telegram">Telegram</label>
            <input className="applicantField" id="telegram" value={state.contacts?.telegram}
                   onChange={inputChangeHandler} name="telegram" />
          </Grid>
        </div>
        <LoadingButton
          className="sendBtn"
          type="submit"
          color="primary"
          variant="contained"
          loading={loading}
          disabled={allFieldsEmpty}
        >
          Сохранить изменения
        </LoadingButton>
        <Button color="primary" variant="contained" className="sendBtn"
                onClick={() => navigate('/userProfile')}>Назад</Button>
      </form>
    </div>
  )
    ;
};

export default Form;
