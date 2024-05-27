import { Button, Grid } from '@mui/material';
import { cities, educationTypes, jobCities, jobs } from '../constant';
import { LoadingButton } from '@mui/lab';
import React, { ReactNode } from 'react';
import { ApplicantMutation } from '../../../types';

interface Props {
  state: ApplicantMutation;
  submitFormHandler: (e: React.FormEvent) => void;
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  addField: () => void;
  fields: ReactNode[];
  loading: boolean;
}

const Form: React.FC<Props> = ({loading, fields, state, submitFormHandler, inputChangeHandler, addField}) => {
  return (
    <div className="applicantFormContainer">
      <form style={{display: "flex", flexDirection: 'column', alignItems: 'center'}} autoComplete="off" onSubmit={submitFormHandler}>
        <div className='formContainer'>
          {/*fio*/}
          <div className='inputContainer'>
            <Grid item xs >
              <label className="labelForField" htmlFor="firstName">Имя</label>
              <input
                className="field"
                id="firstName"
                value={state.firstName}
                onChange={inputChangeHandler}
                name="firstName"
                required
              />
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="surname">Фамилия</label>
              <input
                className="field"
                id="surname"
                value={state.surname}
                onChange={inputChangeHandler}
                name="surname"
                required
              />
            </Grid>
          </div>
          {/*отчество*/}
          <Grid item xs>
            <label className="labelForField" htmlFor="secondName">Отчество</label>
            <input
              className="field"
              id="secondName"
              value={state.secondName}
              onChange={inputChangeHandler}
              name="secondName"
              required
            />
          </Grid>
          {/*пол и возраст*/}
          <div className="inputContainer">
            <Grid item xs={7}>
              <label className="labelForField" htmlFor="sex">Пол</label>
              <select
                className="field"
                onChange={inputChangeHandler}
                id="sex"
                value={state.sex}
                name="sex"
                required
              >
                <option className="menuItem" value="">Не указан</option>
                <option className="menuItem" value="жен">Женский</option>
                <option className="menuItem" value="муж">Мужской</option>
              </select>
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="dateOfBirth">Дата рождения</label>
              <input
                type={'date'}
                className="field"
                id="dateOfBirth"
                value={state.dateOfBirth}
                onChange={inputChangeHandler}
                name="dateOfBirth"
                required
              />
            </Grid>
          </div>
          {/*страна и город*/}
          <div className='inputContainer'>
            <Grid item xs>
              <label className="labelForField" htmlFor="country">Страна</label>
              <select
                className="field"
                id="country"
                value={state.country}
                onChange={inputChangeHandler}
                name="country"
                required
              >
                <option className="menuItem" value="">Выберите страну</option>
                <option className="menuItem" value="Кыргызстан">Кыргызстан</option>
              </select>
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="city">Город</label>
              <select
                className="field"
                id="city"
                value={state.city}
                onChange={inputChangeHandler}
                name="city"
                required
              >
                <option className="menuItem" value="">Выберите город</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </Grid>
          </div>
          {/* образование */}
          <Grid item xs>
            <label className="labelForField" htmlFor="education">Образование</label>
            <select
              className="field"
              id="education"
              value={state.education}
              onChange={inputChangeHandler}
              name="education"
              required
            >
              <option value="">Не указано</option>
              {educationTypes.map((educationType, index) => (
                <option key={index} value={educationType}>{educationType}</option>
              ))}
            </select>
          </Grid>
          {/* о себе */}
          <Grid item xs>
            <label className="labelForField" htmlFor="aboutApplicant">О себе</label>
            <textarea
              className="field"
              id="aboutApplicant"
              value={state.aboutApplicant}
              onChange={inputChangeHandler}
              name="aboutApplicant"
              required
            />
          </Grid>
          {/* опыт работы */}
          <Grid item xs>
            <Grid item xs>
              <Button variant="contained"
                      sx={{marginTop: '10px', backgroundColor: '#0866FF', color: '#ffff', borderRadius: '30px'}}
                      onClick={() => addField()}>Добавить опыт
                работы</Button>
            </Grid>
            <Grid display="flex" mt={2} flexWrap={'wrap'}>
              {fields.map(field => field)}
            </Grid>
          </Grid>
          {/* ищу работу */}
          <div className='inputContainer'>
            <Grid item xs>
              <label className="labelForField" htmlFor="wantedJob">Ищу работу в сфере:</label>
              <select
                className="field"
                id="wantedJob"
                value={state.wantedJob}
                onChange={inputChangeHandler}
                name="wantedJob"
                required
              >
                <option className="menuItem" value="">Выберите профессию</option>
                {jobs.map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </Grid>
            <Grid item xs>
              <label className="labelForField" htmlFor="wantedJobCity">Выберите город</label>
              <select
                className="field"
                id="wantedJobCity"
                value={state.wantedJobCity}
                onChange={inputChangeHandler}
                name="wantedJobCity"
                required
              >
                <option className="menuItem" value="">Выберите город</option>
                {jobCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </Grid>
          </div>
        </div>
        <LoadingButton
          className="sendBtn"
          type="submit"
          color="primary"
          variant="contained"
          loading={loading}
        >
          Сохранить изменения
        </LoadingButton>
      </form>
    </div>
  );
};

export default Form;