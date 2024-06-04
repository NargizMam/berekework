import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectBlock, selectIsLoading, selectVacancy, selectisLoadingCard } from '../model/VacancyBlockSlice';
import { getVacancyCard } from '../model/VacancyBlockThunks';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Loader } from '../../../../shared/loader';
import VacancyBlockStyle from './VacancyBlock-style';
import './VacancyBlock.css';
import { VacancyCard } from '../../../../feachers/vacancyCard';

export const VacancyBlock = () => {
  const dispatch = useAppDispatch();
  const block = useAppSelector(selectBlock);
  const vacancyCard = useAppSelector(selectVacancy);
  const isLoading = useAppSelector(selectIsLoading);
  const isLoadingCard = useAppSelector(selectisLoadingCard);
  let render;

  useEffect(() => {
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
            {vacancyCard.map((data, index) => {
              if (index < 6) {
                return <VacancyCard data={data} visible={true} />;
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
