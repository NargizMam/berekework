import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { IFooterLinks } from '../../../shared/types';
import './footerLInksBlock.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

interface FooterLinksBlockProps {
	footerBlocks: IFooterLinks[];
}

const FooterLinksBlock: React.FC<FooterLinksBlockProps> = ({ footerBlocks }) => {
	
	return (
		<div className='footerLinksBlocks'>
			{footerBlocks.map((block, index) => (
				<div className='footerLinksBlock' key={index}>
					<h1>{block.title}</h1>
					<div className='div-list'>
						<ul className='links-list'>
							{block.links.map((link, linkIndex) => (
								<li key={linkIndex}>
									<a href={link.url}>{link.text}</a>
								</li>
							))}
						</ul>
					</div>
					<div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
						<ModeEditIcon className='edit-icon' />
						<CloseIcon className='delete-icon' />
					</div>
				</div>
			))}
		</div>
	);
};

export default FooterLinksBlock;
