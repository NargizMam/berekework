import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './employerProfile.css';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectEmployersProfileInfo } from '../model/employerProfileSlice';
import { getEmployersProfileInfo } from '../app/employerProfileThunk';
import { Loader } from '../../../../shared/loader';


const EmployerProfile = () => {
  const [openForm, setOpenForm] = useState(false);
  const profile = useAppSelector(selectEmployersProfileInfo)!;
  const dispatch = useAppDispatch();
  const apiURL = 'http://localhost:8000';

  const image = apiURL + '/' + profile?.logo;

  useEffect(() => {
    dispatch(getEmployersProfileInfo('663a177c7845069a6944e4a7')).unwrap();
  }, [dispatch]);
  console.log(profile);
  return (
    <div>
      <div style={{position: 'fixed', top: 'auto', right: 20, zIndex: 999, margin: '5px'}}>
        <Button variant="outlined" onClick={() => setOpenForm(true)}>Create vacancy</Button>
      </div>
      {profile ? (
        <>
          <Typography variant="h2">
            {profile.companyName}
          </Typography>
          <img src={image} alt="Логотип компании"/>
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
        </>
      ) : (<Loader/>)}

      {openForm && <h1>Here will be form for vacancies</h1>}
    </div>
  );
};

export default EmployerProfile;
