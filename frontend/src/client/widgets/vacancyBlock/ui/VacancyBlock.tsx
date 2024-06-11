import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  const [visibleVacancies, setVisibleVacancies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    dispatch(getAllVacancyToCard());
  }, [dispatch]);
  
  useEffect(() => {
    if (vacancyCards) {
      setVisibleVacancies(vacancyCards.slice(-6));
      setIsLoading(false);
    }
  }, [vacancyCards]);
  
  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress sx={{ margin: 'auto' }} />;
    }
    
    if (visibleVacancies.length === 0) {
      return <p className='not-vacancies-text'>Пока нет никаких вакансий</p>;
    }
    
    return (
      <>
        <div className="VacancyBlock__flex">
          {visibleVacancies.map((vacancy, index) => (
            <VacancyCard key={index} data={vacancy} visible={true} />
          ))}
        </div>
      </>
    );
  };
  
  return (
    <div id='last-vacancy' className="vacancy_block">
      <h1 className="vacancy_block_title">{data.slice.primary.vacancies_block_title}</h1>
      <div>{renderContent()}</div>
      {vacancyCards && visibleVacancies.length < vacancyCards.length && visibleVacancies.length > 0 && (
        <NavLink to='/vacancy' className="vacancy_block_button">
          {data.slice.primary.button_text_vacancies_block}
        </NavLink>
      )}
    </div>
  );
};
