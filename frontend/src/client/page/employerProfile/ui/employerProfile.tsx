import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectEmployersProfileInfo } from '../model/employerProfileSlice';
import { getEmployersProfileInfo } from '../app/employerProfileThunk';
import { Loader } from '../../../../shared/loader';
import { VacancyCard } from '../../../../admin/widgets/vacancyCard';
import { useParams } from 'react-router-dom';
import { selectEmployerLoading } from '../../../../admin/page/employerPanel/model/employerSlice';
import './employerProfile.css';
import { CreateVacancyForm } from '../../../widgets/createVacancyForm';

const EmployerProfile = () => {
  const dispatch = useAppDispatch();
  const [openForm, setOpenForm] = useState(false);
  const profile = useAppSelector(selectEmployersProfileInfo);
  const loading = useAppSelector(selectEmployerLoading);
  const apiURL = 'http://localhost:8000';
  const image = apiURL + '/' + profile?.logo;
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEmployersProfileInfo(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <div className='createVacancyContainer' >
        <Button variant="outlined" onClick={() => setOpenForm(true)}>Создать вакансию</Button>
      </div>
      {loading && <Loader/>}
      {profile ? (
        <Grid mt={6}>
          <div className='companyHeader'>
            <img className="companyLogo" src={image} alt="Логотип компании" height="100px"/>
            <Typography ml={2} variant="h4">{profile.companyName}</Typography>
          </div>
          <p className="companyInfo">
            <strong>Сфера деятельности:</strong> {profile.industry}
          </p>
          <p className="companyInfo">
            <strong>Описание:</strong> {profile.description}
          </p>
          <p className="companyInfo">
            <strong>Адрес:</strong> {profile.address}
          </p>
          <p className="companyInfo">
            <strong>Контакты:</strong> {profile.contacts}
          </p>
          <a className="companyLink" href={profile.documents} download>
            Скачать документы
          </a>
          <Grid mt={6} mb={6}>
            <Typography mb={2} variant='h5'> Ваши вакансии:</Typography>
            {profile.vacancies.length > 0 ? (
              profile.vacancies.map((vacancy) => (
                <Grid mb={2}>
                  <VacancyCard key={vacancy._id} data={vacancy}/>
                </Grid>
              ))
            ) : (
              <h6>Добавьте свои вакансии</h6>
            )}
          </Grid>

        </Grid>
      ) : (
        <h1>Данные работодателя еще не введены</h1>
      )}

      {openForm && (
        <>
          <Typography variant="h4">Создайте свои вакансии</Typography>
          <CreateVacancyForm setOpenForm={setOpenForm}/>
        </>
      )}
    </div>
  );
};

export default EmployerProfile;
