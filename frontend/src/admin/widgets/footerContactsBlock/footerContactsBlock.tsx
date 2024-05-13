import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';
import { IContactsBlock } from '../../../shared/types';

interface FooterContactsBlock {
	contactBlock: IContactsBlock[];
}

const FooterContactsBlock: React.FC<FooterContactsBlock> = ({ contactBlock }) => {
	return (
		<div className='footerLinksBlocks'>
			{contactBlock.map((block, index) => (
				<div className='footerLinksBlock' key={index}>
					<div className='footer-content-block' key={index}>
						<h1>{block.title}</h1>
						<div>
							<ModeEditIcon className='edit-icon' />
							<CloseIcon className='delete-icon' />
						</div>
					</div>
					<ul className='links-list'>
						{block.contactsDetailsArr.map((link, linkIndex) => (
							<li key={linkIndex}>{link.text}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default FooterContactsBlock;