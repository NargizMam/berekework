import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { VacancyCard, VacancyCardApiData } from '../../../feachers/vacancyCard/ui/VacancyCard';
import './VacancyBlock.css';
import VacancyBlockStyle from './VacancyBlock-style';

interface Props {
  data: VacancyCardApiData[];
}

export const VacancyBlock: React.FC<Props> = ({data}) => {
  const [currentRow, setCurrentRow] = useState(6);

  const showMore = () => {
    setCurrentRow(prev => prev + 6);
  };

  return (
    <>
      <Typography variant="h2" sx={VacancyBlockStyle.title}>Последние Вакансии</Typography>
      <div className="VacancyBlock__flex">
        {data.map((data, index) => (
          <VacancyCard key={data._id} data={data} visible={index >= currentRow? false : true}/>
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