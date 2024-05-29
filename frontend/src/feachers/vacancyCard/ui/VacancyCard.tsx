import { Box, Typography } from '@mui/material';
import React from 'react';
import VacancyCardStyle from './VacancyCard-style';
import './VacancyCard.css';

export interface VacancyCardApiData {
  _id: string;
  logo: string;
  company: string;
  vacancyTitle: string;
  aboutVacancy: string;
  responsibilities: string;
  workConditions: string;
  country: string;
  city: string;
  fieldOfWork: string;
  salary: {
    minSalary: number;
    maxSalary: number;
  };
  age: {
    minAge: number;
    maxAge: number;
  };
  education: string;
  employmentType: string;
  employer: string | undefined;
}

interface Props {
  data: VacancyCardApiData;
  visible: boolean;
}

export const VacancyCard: React.FC<Props> = ({ data, visible }) => {
  const image = data.country ? (
    <Box sx={VacancyCardStyle.imageWrapper}>
      <img src={data.logo} alt={data.vacancyTitle} />
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
    <div className="VacancyCard" style={{ display: visible ? 'flex' : 'none' }}>
      {image}
      <Typography variant="h5" sx={VacancyCardStyle.title}>
        {data.vacancyTitle}
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
