import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectBlock, selectIsLoading, selectisLoadingCard, selectVacancy } from '../model/VacancyBlockSlice';
import { getVacancyCard } from '../model/VacancyBlockThunks';
import VacancyBlockStyle from './VacancyBlock-style';
import './VacancyBlock.css';

interface IVacancyBlockProps {
	slice: any;
}

export const VacancyBlock: React.FC<IVacancyBlockProps> = (data) => {
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
          {data.slice.primary}
        </Typography>

        {/* {isLoadingCard ? ( */}
        {/*   <Loader /> */}
        {/* ) : ( */}
        {/*   <div className="VacancyBlock__flex"> */}
        {/*     {vacancyCard.map((data, index) => { */}
        {/*       if (index < 6) { */}
        {/*         return <VacancyCard data={data} visible={true} />; */}
        {/*       } else { */}
        {/*         return null; */}
        {/*       } */}
        {/*     })} */}
        {/*   </div> */}
        {/* )} */}

        <div className="VacancyBlock__buttonWrapper">
          <Link className="VacancyBlock__button" to={block.button.url}>
            <Typography sx={VacancyBlockStyle.button}>{block.button.text}</Typography>
          </Link>
        </div>
      </>
    );
  }
	
  return (
		<div>
			<h1 className='vacancy_block_title'>{data.slice.primary.vacancies_block_title}</h1>
			<button className='vacancy_block_button'>{data.slice.primary.button_text_vacancies_block}</button>
		</div>
  );
};


export default VacancyBlock;