import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { VacancyCard } from '../../../feachers/vacancyCard';
import './VacancyBlock.css';
import VacancyBlockStyle from './VacancyBlock-style';
import { VacancyCardApiData } from '../../../app/types';

interface Props {
  data: VacancyCardApiData[];
}

export const VacancyBlock: React.FC<Props> = ({ data }) => {
  const [currentRow, setCurrentRow] = useState(6);

  const showMore = () => {
    setCurrentRow((prev) => prev + 6);
  };

  return (
    <>
      <Typography variant="h2" sx={VacancyBlockStyle.title}>
        Последние Вакансии
      </Typography>
      <div className="VacancyBlock__flex">
        {data.map((data, index) => (
          <VacancyCard key={data._id} data={data} visible={index < currentRow} />
        ))}
      </div>
      <div className="VacancyBlock__buttonWrapper">
        <button className="VacancyBlock__button" onClick={showMore}>
          <Typography sx={VacancyBlockStyle.button}>Смотреть еще</Typography>
        </button>
      </div>
    </>
  );
};
