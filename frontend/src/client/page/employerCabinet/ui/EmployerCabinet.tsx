import { Avatar, Link, Typography } from '@mui/material';
import React from 'react';
import EmployerCabinetStyle from './EmployerCabinet-style';
import './EmployerCabinet.css';


const EmployerCabinet = () => {
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

export default EmployerCabinet;
