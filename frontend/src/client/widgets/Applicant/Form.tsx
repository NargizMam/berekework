import React, { ReactNode } from 'react';
import { Button, Grid } from '@mui/material';
import { cities, educationTypes, jobCities, jobs } from '../../../app/constants/constant';
import { LoadingButton } from '@mui/lab';
import { UserMutation } from '../../page/Profile/model/types';

interface Props {
  state: UserMutation;
  submitFormHandler: (e: React.FormEvent) => void;
  inputChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  addField: () => void;
  fields: ReactNode[];
  loading: boolean;
}

const Form: React.FC<Props> = ({ loading, fields, state, submitFormHandler, inputChangeHandler, addField }) => {
  return (
    <div className="applicantFormContainer">
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} autoComplete="off" onSubmit={submitFormHandler}>
        <div className="formContainer">
          <div className="inputContainer">
            <Grid item xs>
              <label className="labelForField" htmlFor="name">Имя</label>
              <input className="applicantField" id="name" value={state.name} onChange={inputChangeHandler} name="name" required />
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="surname">Фамилия</label>
              <input className="applicantField" id="surname" value={state.surname} onChange={inputChangeHandler} name="surname" required />
            </Grid>
          </div>
          <Grid item xs>
            <label className="labelForField" htmlFor="patronymic">Отчество</label>
            <input className="field" id="patronymic" value={state.patronymic} onChange={inputChangeHandler} name="patronymic"  />
          </Grid>
          <div className="inputContainer">
            <Grid item xs={7}>
              <label className="labelForField" htmlFor="gender">Пол</label>
              <select className="applicantField" onChange={inputChangeHandler} id="gender" value={state.gender} name="gender" required>
                <option className="menuItem" value="">Не указан</option>
                <option className="menuItem" value="жен">Женский</option>
                <option className="menuItem" value="муж">Мужской</option>
              </select>
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="dateOfBirth">Дата рождения</label>
              <input type={'date'} className="field" id="dateOfBirth" value={state.dateOfBirth} onChange={inputChangeHandler} name="dateOfBirth" required />
            </Grid>
          </div>
          <div className="inputContainer">
            <Grid item xs>
              <label className="labelForField" htmlFor="country">Страна</label>
              <select className="applicantField" id="country" value={state.country} onChange={inputChangeHandler} name="country" required>
                <option className="menuItem" value="">Выберите страну</option>
                <option className="menuItem" value="Кыргызстан">Кыргызстан</option>
              </select>
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="city">Город</label>
              <select className="applicantField" id="city" value={state.city} onChange={inputChangeHandler} name="city" required>
                <option className="menuItem" value="">Выберите город</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </Grid>
          </div>
          <Grid item xs>
            <label className="labelForField" htmlFor="education">Образование</label>
            <select className="applicantField" id="education" value={state.education} onChange={inputChangeHandler} name="education" required>
              <option value="">Не указано</option>
              {educationTypes.map((educationType, index) => (
                <option key={index} value={educationType}>{educationType}</option>
              ))}
            </select>
          </Grid>
          <Grid item xs>
            <label className="labelForField" htmlFor="aboutMe">О себе</label>
            <textarea className="applicantField" id="aboutMe" value={state.aboutMe} onChange={inputChangeHandler} name="aboutMe" required />
          </Grid>
          <Grid item xs>
            <Grid item xs ml={6} mb={2}>
              <Button variant="contained" sx={{ marginTop: '10px', backgroundColor: '#0866FF', color: '#ffff', borderRadius: '30px' }} onClick={addField}>
                Добавить опыт работы
              </Button>
            </Grid>
              {fields.map((field) => field)}
          </Grid>
          <div className="inputContainer">
            <Grid item xs>
              <label className="labelForField" htmlFor="preferredJob">Ищу работу в сфере:</label>
              <select className="applicantField" id="preferredJob" value={state.preferredJob} onChange={inputChangeHandler} name="preferredJob" required>
                <option className="menuItem" value="">Выберите профессию</option>
                {jobs.map((job) => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="preferredCity">Выберите город</label>
              <select className="applicantField" id="preferredCity" value={state.preferredCity} onChange={inputChangeHandler} name="preferredCity" required>
                <option className="menuItem" value="">Выберите город</option>
                {jobCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </Grid>
          </div>
          <div className="inputContainer">
            <Grid item xs>
              <label className="labelForField" htmlFor="phone">Номер телефона</label>
              <input className="applicantField" id="phone" value={state.contacts?.phone} onChange={inputChangeHandler} name="phone" required />
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="whatsapp">WhatsApp</label>
              <input className="applicantField" id="whatsapp" value={state.contacts?.whatsapp} onChange={inputChangeHandler} name="whatsapp" required />
            </Grid>
          </div>
          <Grid item xs>
            <label className="labelForField" htmlFor="telegram">Telegram</label>
            <input className="applicantField" id="telegram" value={state.contacts?.telegram} onChange={inputChangeHandler} name="telegram" required />
          </Grid>
        </div>
        <LoadingButton className="sendBtn" type="submit" color="primary" variant="contained" loading={loading}>
          Сохранить изменения
        </LoadingButton>
      </form>
    </div>
  );
};

export default Form;
