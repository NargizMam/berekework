import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';
import { API_URL } from '../../../app/constants/links';

interface Props {
	image: File | null;
}

const FooterLogo: React.FC<Props> = ({ image }) => {
	const cardImage = API_URL + '/logoFooter/' + image;
	
	console.log(cardImage);
	
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<img src={cardImage} title='logo' alt='logo' />
			<div style={{ marginRight: '60px'}}>
				<ModeEditIcon className='edit-icon' />
				<CloseIcon className='delete-icon' />
			</div>
		</div>
	);
};

export default FooterLogo;