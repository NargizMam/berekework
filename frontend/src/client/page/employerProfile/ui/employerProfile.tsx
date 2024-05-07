import { Link, Typography } from '@mui/material';
import { useEffect } from 'react';
import './employerProfile.css';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectEmployersProfileInfo } from '../model/employerProfileSlice';
import { getEmployersProfileInfo } from '../app/employerProfileThunk';


const EmployerProfile = () => {
  const profile = useAppSelector(selectEmployersProfileInfo)!;
  const dispatch = useAppDispatch();
  console.log('profile');
  useEffect(() => {
    dispatch(getEmployersProfileInfo('6638e5d5840ab0f8a88bc5ec'));
  }, [dispatch]);

  console.log(profile);
  return (
    <div>
      <Typography variant="h2">
        {profile.companyName}
      </Typography>
      <Typography variant="body1" >
        <strong>Сфера деятельности:</strong> {profile.industry}
      </Typography>
      <Typography variant="body1" >
        <strong>Описание:</strong> {profile.description}
      </Typography>
      <Typography variant="body1" >
        <strong>Адрес:</strong> {profile.address}
      </Typography>
      <Typography variant="body1" >
        <strong>Контакты:</strong> {profile.contacts}
      </Typography>
      <img src={profile.logo} alt="Логотип компании" />
      <Link href={profile.documents} download>
        Скачать документы
      </Link>
    </div>
  );
};

export default EmployerProfile;
