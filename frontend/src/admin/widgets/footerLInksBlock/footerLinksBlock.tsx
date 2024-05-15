import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';
import { useAppDispatch } from '../../../app/store/hooks';
import { IFooterLinks } from '../../../shared/types';
import './footerLInksBlock.css';
import { deleteFooterLink, fetchFooterData } from '../../page/FooterAdmin/api/FooterThunk';

interface FooterLinksBlockProps {
	footerBlocks: IFooterLinks[];
}

const FooterLinksBlock: React.FC<FooterLinksBlockProps> = ({ footerBlocks }) => {
	const dispatch = useAppDispatch();
	
	
	const onDelete = async (linkId: string) => {
		if (window.confirm('Delete this link?')) {
			try {
				await dispatch(deleteFooterLink(linkId));
				alert('Deleted');
				dispatch(fetchFooterData());
			} catch (e) {
				alert('Not deleted');
			}
		}
	};
	
	return (
		<div className='footerLinksBlocks'>
			{footerBlocks.map((block, index) => (
				<div className='footerLinksBlock' key={index}>
					<h1>{block.title}</h1>
					<ul className='links-list'>
						{block.links.map((link, linkIndex) => (
							<li key={linkIndex}>
								<a href={link.url}>{link.text}</a>
							</li>
						))}
					</ul>
					<div className="icons-block">
						<ModeEditIcon className='edit-icon' />
						<CloseIcon
							className='delete-icon'
							onClick={() => onDelete(block._id)}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default FooterLinksBlock;
