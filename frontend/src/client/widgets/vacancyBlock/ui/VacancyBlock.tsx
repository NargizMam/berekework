import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { getAllVacancyToCard } from '../../../../feachers/vacancy/vacancyThunk';
import './VacancyBlock.css';
import { selectVacancyToCards } from '../../../../feachers/vacancy/vacancySlice';
import { VacancyCard } from '../../../../feachers/vacancyCard';

interface IVacancyBlockProps {
  slice: any;
}

export const VacancyBlock: React.FC<IVacancyBlockProps> = (data) => {
  const dispatch = useAppDispatch();
  const vacancyCards = useAppSelector(selectVacancyToCards);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    dispatch(getAllVacancyToCard());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const renderContent = () => {
    if (!vacancyCards) {
      return <CircularProgress sx={{ margin: 'auto' }} />;
    }

    return (
      <>
        <div className="VacancyBlock__flex">
          {vacancyCards.slice(0, visibleCount).map((data, index) => (
            <VacancyCard key={index} data={data} visible={true} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="vacancy_block">
      <h1 className="vacancy_block_title">{data.slice.primary.vacancies_block_title}</h1>
      <div>{renderContent()}</div>
      {vacancyCards && visibleCount < vacancyCards.length && (
        <button className="vacancy_block_button" onClick={handleLoadMore}>
          {data.slice.primary.button_text_vacancies_block}
        </button>
      )}
    </div>
  );
};
