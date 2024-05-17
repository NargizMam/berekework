import { Box, Typography } from '@mui/material';
import React from 'react';
import VacancyCardStyle from './VacancyCard-style';
import './VacancyCard.css';
import { VacancyCardApiData } from '../../vacancyBlock/types';

interface Props {
  data: VacancyCardApiData;
}

export const VacancyCard: React.FC<Props> = ({ data }) => {
  const image = data.logoCompany ? (
    <Box sx={VacancyCardStyle.imageWrapper}>
      <img src={data.logoCompany} alt={data.vacancyTitle} />
    </Box>
  ) : null;
  let salary = 'з/п не указана';

  if (data.salary?.minSalary && data.salary.maxSalary) {
    salary = `от ${data.salary.minSalary} до ${data.salary.maxSalary} сом`;
  } else if (data.salary?.minSalary) {
    salary = `от ${data.salary.minSalary} сом`;
  } else if (data.salary?.maxSalary) {
    salary = `до ${data.salary.maxSalary} сом`;
  }
  return (
    <div className="VacancyCard">
      {image}
      <Typography variant="h5" sx={VacancyCardStyle.title}>
        {data.vacancyTitle}
      </Typography>
      <Typography sx={VacancyCardStyle.subTitle}>
        {data.nameCompany}, {data.city}
      </Typography>
      <Typography variant="h5" sx={VacancyCardStyle.salary}>
        {salary}
      </Typography>
    </div>
  );
};
