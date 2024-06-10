import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { getAllVacancyToCard } from '../../../../feachers/vacancy/vacancyThunk';
import { VacancyCard } from '../../../../feachers/vacancyCard';
import './VacancyBlock.css';
import { selectVacancyToCards } from '../../../../feachers/vacancy/vacancySlice';

interface IVacancyBlockProps {
	slice: any;
}

export const VacancyBlock: React.FC<IVacancyBlockProps> = (data) => {
	const dispatch = useAppDispatch();
	const vacancyCard = useAppSelector(selectVacancyToCards);
	

	useEffect(() => {
		dispatch(getAllVacancyToCard());
	}, [dispatch]);
	
	const renderContent = () => {
		if (!vacancyCard) {
			return <CircularProgress sx={{margin: 'auto'}}/>;
		}
		
		return (
			<>
				<div className='VacancyBlock__flex'>
					{vacancyCard.map((data, index) => {
						if (index < 6) {
							return <VacancyCard key={index} data={data} visible={true} />;
						}
						return null;
					})}
				</div>
			</>
		);
	};
	
	return (
		<div className='vacancy_block'>
			<h1 className='vacancy_block_title'>{data.slice.primary.vacancies_block_title}</h1>
			<div>
				{renderContent()}
			</div>
			<button className='vacancy_block_button'>{data.slice.primary.button_text_vacancies_block}</button>
		</div>
	);
};
