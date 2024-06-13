import React from 'react';
import '../css/chooseBlockStyle.css';
import '../css/chooseBlockMedia.css';

export interface ChooseSpecialistBlockData {
	primary: {
		img: {
			alt: string;
			url: string;
		};
		link: {
			target: string;
			url: string;
		};
		title: string;
	};
}

interface Props {
	slice: ChooseSpecialistBlockData;
}

export const ChooseSpecialistBlock: React.FC<Props> = ({ slice }) => {
	
	return (
		<div style={{ margin: '100px 0' }} className='chooseBlock'>
			<div className='chooseBlockContent'>
				<h2 id='specialist' className='chooseBlock-title'>{slice.primary.title}</h2>
				<a href={'news/' + slice.primary.link.url} className='button-link'>
					Читать подробнее
					<span className='span'></span>
				</a>
			</div>
			<img className='chooseBlock-img' alt={slice.primary.img.alt} src={slice.primary.img.url} />
		</div>
	);
};
