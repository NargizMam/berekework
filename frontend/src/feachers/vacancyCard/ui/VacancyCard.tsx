import { Box, Typography } from '@mui/material';
import React from 'react';
import VacancyCardStyle from './VacancyCard-style';
import './VacancyCard.css';

export interface VacancyCardApiData {
  _id: string;
  title: string;
  description?: string;
  logo?: string;
  company?: string;
  city: string;
  salary?: {
    min?: number;
    max?: number;
  };
}

interface Props {
  data: VacancyCardApiData;
  visible: boolean;
}

export const VacancyCard: React.FC<Props> = ({ data, visible }) => {
  const image = data.logo ? (
    <Box sx={VacancyCardStyle.imageWrapper}>
      <img src={data.logo} alt={data.title} />
    </Box>
  ) : null;
  let salary = 'з/п не указана';

  if (data.salary?.min && data.salary.max) {
    salary = `от ${data.salary.min} до ${data.salary.max} сом`;
  } else if (data.salary?.min) {
    salary = `от ${data.salary.min} сом`;
  } else if (data.salary?.max) {
    salary = `до ${data.salary.max} сом`;
  }
  return (
    <div className="VacancyCard" style={{ display: visible ? 'flex' : 'none' }}>
      {image}
      <Typography variant="h5" sx={VacancyCardStyle.title}>
        {data.title}
      </Typography>
      <Typography sx={VacancyCardStyle.subTitle}>
        {data.company}, {data.city}
      </Typography>
      <Typography variant="h5" sx={VacancyCardStyle.salary}>
        {salary}
      </Typography>
    </div>
  );
};
