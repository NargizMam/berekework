import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';

interface Props {
	text: string;
}

const FooterCopyrightAdmin: React.FC<Props> = ({ text }) => {
	return (
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<p>{text}</p>
			<div style={{ marginRight: '60px' }}>
				<ModeEditIcon className='edit-icon' />
				<CloseIcon className='delete-icon' />
			</div>
		</div>
	);
};

export default FooterCopyrightAdmin;