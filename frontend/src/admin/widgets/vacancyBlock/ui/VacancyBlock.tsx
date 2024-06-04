import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectBlock, selectIsLoading, selectVacancy, selectisLoadingCard } from '../model/VacancyBlockSlice';
import { getVacancyBlock, getVacancyCard } from '../model/VacancyBlockThunks';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Loader } from '../../../../shared/loader';
import { VacancyCard } from '../../vacancyCard';
import { VacancyCardApiData } from '../types';
import VacancyBlockStyle from './VacancyBlock-style';
import './VacancyBlock.css';

export const VacancyBlock = () => {
  const dispatch = useAppDispatch();
  const block = useAppSelector(selectBlock);
  const vacancyCard = useAppSelector(selectVacancy);
  const isLoading = useAppSelector(selectIsLoading);
  const isLoadingCard = useAppSelector(selectisLoadingCard);
  let render;
  useEffect(() => {
    dispatch(getVacancyBlock()).unwrap();
    dispatch(getVacancyCard()).unwrap();
  }, [dispatch]);

  if (block) {
    render = (
      <>
        <Typography variant="h2" sx={VacancyBlockStyle.title}>
          {block.title}
        </Typography>

        {isLoadingCard ? (
          <Loader />
        ) : (
          <div className="VacancyBlock__flex">
            {vacancyCard.map((data: VacancyCardApiData, index: number) => {
              if (index < 6) {
                return <VacancyCard key={data._id} data={data} />;
              } else {
                return null;
              }
            })}
          </div>
        )}

        <div className="VacancyBlock__buttonWrapper">
          <Link className="VacancyBlock__button" to={block.button.url}>
            <Typography sx={VacancyBlockStyle.button}>{block.button.text}</Typography>
          </Link>
        </div>
      </>
    );
  }

  return <>{isLoading ? <Loader /> : render}</>;
};
