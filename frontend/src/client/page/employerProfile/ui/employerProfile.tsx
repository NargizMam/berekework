import { Button, Typography } from '@mui/material';
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
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEmployersProfileInfo(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <div style={{ position: 'fixed', top: 'auto', right: 20, zIndex: 999, margin: '5px' }}>
        <Button variant="outlined" onClick={() => setOpenForm(true)}>Create vacancy</Button>
      </div>
      {loading && <Loader />}
      {profile ? (
        <>
          <Typography variant="h2">{profile.companyName}</Typography>
          <img src={image} alt="Логотип компании" height="100px" />
          <Typography variant="body1">
            <strong>Сфера деятельности:</strong> {profile.industry}
          </Typography>
          <Typography variant="body1">
            <strong>Описание:</strong> {profile.description}
          </Typography>
          <Typography variant="body1">
            <strong>Адрес:</strong> {profile.address}
          </Typography>
          <Typography variant="body1">
            <strong>Контакты:</strong> {profile.contacts}
          </Typography>
          <a href={profile.documents} download>
            Скачать документы
          </a>
          {profile.vacancies.length > 0 ? (
            profile.vacancies.map((vacancy) => (
              <VacancyCard key={vacancy._id} data={vacancy} />
            ))
          ) : (
            <h6>Добавьте свои вакансии</h6>
          )}
        </>
      ) : (
        <h1>Данные работодателя еще не введены</h1>
      )}

      {openForm && (
        <>
          <Typography variant="h4">Создайте свои вакансии</Typography>
          <CreateVacancyForm setOpenForm={setOpenForm} />
        </>
      )}
    </div>
  );
};

export default EmployerProfile;
