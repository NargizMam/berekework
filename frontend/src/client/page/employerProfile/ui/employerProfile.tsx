import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Loader } from '../../../../shared/loader';
import { useNavigate, useParams } from 'react-router-dom';

import {
  selectEmployerLoading,
  selectEmployersProfileInfo,
} from '../../../../admin/page/employerPanel/model/employerSlice';
import './employerProfile.css';
import { CreateVacancyForm } from '../../../widgets/createVacancyForm';
import { getEmployersProfileInfo } from '../../../../admin/page/employerPanel/api/employerThunk';

const EmployerProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openVacancyForm, setOpenVacancyForm] = useState(false);
  const profile = useAppSelector(selectEmployersProfileInfo);
  const loading = useAppSelector(selectEmployerLoading);
  const navigate = useNavigate();
  // const apiURL = 'http://localhost:8000';
  // const image = apiURL + '/' + profile?.logo;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEmployersProfileInfo(id));
    }
  }, [dispatch, id]);

  if (loading) return <Loader />;

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant="outlined"
        sx={{ position: 'absolute', top: '20px', right: '50px' }}
        onClick={() => navigate(`/edit-employer/${profile?._id}`)}
      >
        Редактировать профиль
      </Button>
      <div className='createVacancyContainer'>
        {profile?.isPublished && (
          <Button variant="outlined" onClick={() => setOpenVacancyForm(true)}>Создать вакансию</Button>
        )}
      </div>

      {profile && (
        <Grid mt={6}>
          <div className="companyHeader">
            <img className="companyLogo" src={`http://localhost:8000/${profile.logo}`} alt="Логотип компании" height="100px" />
            <Typography ml={2} variant="h4">{profile.companyName}</Typography>
          </div>
          <p className="companyInfo"><strong>Сфера деятельности:</strong> {profile.industry}</p>
          <p className="companyInfo"><strong>Описание:</strong> {profile.description}</p>
          <p className="companyInfo"><strong>Адрес:</strong> {profile.address}</p>
          <p className="companyInfo"><strong>Контакты:</strong> {profile.contacts}</p>
          <a className="companyLink" href={profile.document || '#'} download>Скачать документы</a>
          <Grid mt={6} mb={6}>
            <Typography mb={2} variant="h5">Ваши вакансии:</Typography>
            {profile.vacancies.length > 0 ? (
              profile.vacancies.map((vacancy) => (
                <Grid mb={2} key={vacancy._id}>
                  Здесь должны быть вакансии
                </Grid>
              ))
            ) : (
              <h6>Добавьте свои вакансии</h6>
            )}
          </Grid>
        </Grid>
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
