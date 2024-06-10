import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../app/constants/links';
import VacancyCardStyle from './VacancyCard-style';
import './VacancyCard.css';
import { VacancyResponseToCard } from '../../../app/types';

interface Props {
  data: VacancyResponseToCard;
  visible: boolean;
}

export const VacancyCard: React.FC<Props> = ({ data, visible }) => {
	
  const image = data.employer.avatar ? (
    <Box sx={VacancyCardStyle.imageWrapper}>
      <img src={API_URL + '/' + data.employer.avatar} alt={data.vacancyTitle} />
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

  const LinkItem = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });

  return (
    <LinkItem to={`/vacancy/` + data._id}>
      <div className="VacancyCard" style={{ display: visible ? 'flex' : 'none' }}>
        {image}
        <Typography variant="h5" sx={VacancyCardStyle.title}>
          {data.vacancyTitle}
        </Typography>
        <Typography sx={VacancyCardStyle.subTitle}>
          {data.employer.companyName}, {data.city}
        </Typography>
        <Typography variant="h5" sx={VacancyCardStyle.salary}>
          {salary}
        </Typography>
      </div>
    </LinkItem>
  );
};
