import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/store/hooks';
import { IFooterLinks, ILinks } from '../../../shared/types';
import './footerLInksBlock.css';
import { deleteFooterLink, fetchFooterData } from '../../page/FooterAdmin/api/FooterThunk';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

interface FooterLinksBlockProps {
	footerBlocks: IFooterLinks[];
}

const FooterLinksBlock: React.FC<FooterLinksBlockProps> = ({ footerBlocks }) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const [selectedBlock, setSelectedBlock] = useState<IFooterLinks | null>(null);
	const [editedLinks, setEditedLinks] = useState<ILinks[]>([]);
	
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
	
	const handleOpen = (block: IFooterLinks) => {
		setSelectedBlock(block);
		setEditedLinks(block.links);
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
		setSelectedBlock(null);
		setEditedLinks([]);
	};
	
	const handleLinkChange = (index: number, field: keyof ILinks, value: string) => {
		const updatedLinks = [...editedLinks];
		updatedLinks[index] = { ...updatedLinks[index], [field]: value };
		setEditedLinks(updatedLinks);
	};
	
	// const handleSubmit = async () => {
	// 	if (selectedBlock) {
	// 		const updatedBlock: IFooterLinks = {
	// 			...selectedBlock,
	// 			links: editedLinks
	// 		};
	//
	// 		try {
	// 			await dispatch(updateFooterLink(updatedBlock));
	// 			alert('Updated');
	// 			dispatch(fetchFooterData());
	// 			handleClose();
	// 		} catch (e) {
	// 			alert('Update failed');
	// 		}
	// 	}
	// };
	
	return (
		<>
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
						<div className='icons-block'>
							<ModeEditIcon
								onClick={() => handleOpen(block)}
								className='edit-icon' />
							<CloseIcon
								className='delete-icon'
								onClick={() => onDelete(block._id)}
							/>
						</div>
					</div>
				))}
			</div>
			{selectedBlock && (
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							Edit the fields you want to change:
						</Typography>
						<Grid mt={5} container spacing={2}>
							{editedLinks.map((link, index) => (
								<React.Fragment key={link._id}>
									<Grid item xs={12}>
										<TextField
											fullWidth
											label='Link Text'
											value={link.text}
											onChange={(e) => handleLinkChange(index, 'text', e.target.value)}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											label='Link URL'
											value={link.url}
											onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
										/>
									</Grid>
								</React.Fragment>
							))}
						</Grid>
						<Button variant='contained' color='primary'>
							Save Changes
						</Button>
					</Box>
				</Modal>
			)}
		</>
	);
};

export default FooterLinksBlock;
