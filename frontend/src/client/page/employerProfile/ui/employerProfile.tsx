import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Loader } from '../../../../shared/loader';
import { useParams } from 'react-router-dom';
import {
  selectEmployerLoading,
  selectEmployersProfileInfo,
} from '../../../../admin/page/employerPanel/model/employerSlice';
import './employerProfile.css';
import { CreateVacancyForm } from '../../../widgets/createVacancyForm';
import { getEmployersProfileInfo } from '../../../../admin/page/employerPanel/api/employerThunk';
import { EmployerFormPage } from '../../../../admin/page/employerPanel';
import { VacancyCard } from '../../../../feachers/vacancyCard';

const EmployerProfile = () => {
  const dispatch = useAppDispatch();
  const [openVacancyForm, setOpenVacancyForm] = useState(false);
  const [openProfileForm, setOpenProfileForm] = useState(false);
  const profile = useAppSelector(selectEmployersProfileInfo);
  const loading = useAppSelector(selectEmployerLoading);
  const apiURL = 'http://localhost:8000';
  const image = apiURL + '/' + profile?.logo;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEmployersProfileInfo(id));
    }
  }, [dispatch, id]);

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant="outlined"
        sx={{ position: 'absolute', top: '20px', right: '50px' }}
        onClick={() => setOpenProfileForm(true)}
      >
        Редактировать профиль
      </Button>
      <div className="createVacancyContainer">
        {profile && profile.isPublished === true && (
          <Button variant="outlined" onClick={() => setOpenVacancyForm(true)}>
            Создать вакансию
          </Button>
        )}
      </div>

      {loading && <Loader />}
      {profile && !openProfileForm && (
        <Grid mt={6}>
          <div className="companyHeader">
            <img className="companyLogo" src={image} alt="Логотип компании" height="100px" />
            <Typography ml={2} variant="h4">
              {profile.companyName}
            </Typography>
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
          {/*<a className="companyLink" href={profile.document} download>*/}
          {/*  Скачать документы*/}
          {/*</a>*/}
          <Grid mt={6} mb={6}>
            <Typography mb={2} variant="h5">
              {' '}
              Ваши вакансии:
            </Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px 15px',
            }}>
              {profile.vacancies.length > 0 ? (
                profile.vacancies.map((vacancy) => (
                  <VacancyCard
                    key={vacancy._id}
                    data={vacancy}
                    visible={true}
                  />
                ))
              ) : (
                <h6>Добавьте свои вакансии</h6>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
      {openProfileForm && profile && (
        <>
          <Typography variant="h4">Редактируйте свой профиль</Typography>
          <EmployerFormPage id={profile._id} key={profile._id} initialProfile={profile} />
        </>
      )}

      {openVacancyForm && (
        <>
          <Typography variant="h4">Создайте свои вакансии</Typography>
          <CreateVacancyForm setOpenForm={setOpenVacancyForm} />
        </>
      )}
    </div>
  );
};

export default EmployerProfile;
