import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';
import { IContactsBlock } from '../../../shared/types';
import './footerContactBlock.css';

interface FooterContactsBlock {
	contactBlock: IContactsBlock[];
}

const FooterContactsBlock: React.FC<FooterContactsBlock> = ({ contactBlock }) => {
	return (
		<div className='footer-contact-block'>
			<div className='contactBlock-content'>
				{contactBlock.map((block, index) => (
					<div key={index}>
						<h1>{block.title}</h1>
						<ul className='links-list'>
							{block.contactsDetailsArr.map((link, linkIndex) => (
								<li key={linkIndex}>{link.text}</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<div className='icons-block-contacts'>
				<ModeEditIcon className='edit-icon' />
				<CloseIcon className='delete-icon' />
			</div>
		</div>
	);
};

export default FooterContactsBlock;