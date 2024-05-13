import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IFooterLinks, ILinks } from '../../../../shared/types';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { createFooterLinks, fetchFooterData } from '../../../page/FooterAdmin/api/FooterThunk';
import { selectFooter } from '../../../page/FooterAdmin/model/FooterSlice';

interface LinkBlockFormProps {
	open: boolean;
	onClose: () => void;
}

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

const LinkBLockForm: React.FC<LinkBlockFormProps> = ({ open, onClose }) => {
	const [title, setTitle] = useState('');
	const dispatch = useAppDispatch();
	const footer = useAppSelector(selectFooter);
	
	useEffect(() => {
		dispatch(fetchFooterData());
	}, [dispatch]);
	
	const [linksState, setLinksState] = useState<ILinks[]>(
		[{ url: '', text: '' }]
	);
	
	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
	
	const addInputField = () => {
		setLinksState([...linksState, { url: '', text: '' }]);
	};
	
	const removeFields = (index: number) => {
		const data = [...linksState];
		data.splice(index, 1);
		setLinksState(data);
	};
	
	const handleUrlChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newData = [...linksState];
		newData[index].url = event.target.value;
		setLinksState(newData);
	};
	
	const handleTextChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newData = [...linksState];
		newData[index].text = event.target.value;
		setLinksState(newData);
	};
	
	const submitFormHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!title.trim()) {
			alert('Введите заголовок блока с ссылками');
			return;
		}
		
		if (linksState.some(link => !link.url.trim() || !link.text.trim())) {
			alert('Введите URL и текст для всех ссылок');
			return;
		}
		
		const footerLinks = footer[0]?.footerLinks;
		
		if (!footerLinks || !Array.isArray(footerLinks)) {
			console.error('Invalid footerLinks data:', footerLinks);
			return;
		}
		
		const existingFooterLinksCount = footerLinks.length;
		
		if (existingFooterLinksCount >= 5) {
			alert('Превышено максимальное количество блоков с ссылками (5)\n' +
				'Прежде чем добавить новый блок, удалите один из уже существующих');
			return;
		}
		
		const obj: IFooterLinks = {
			title: title,
			links: linksState
		};
		
		try {
			await dispatch(createFooterLinks(obj));
			alert('ВЫ успешно создали блок с ссылками!');
			onClose();
		} catch (e) {
			alert('Invalid field');
		}
	};
	
	
	const closeModal = () => {
		onClose();
	};
	
	return (
		<div>
			<Modal
				open={open}
				onClose={closeModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							Создание блока с ссылками
						</Typography>
						<Button onClick={closeModal}><CloseIcon /></Button>
					</Grid>
					<TextField
						label='Заголовок блока с ссылками'
						variant='outlined'
						fullWidth
						value={title}
						onChange={handleTitleChange}
						sx={{ mt: 2 }}
						required
					/>
					{linksState.map((element, index) => (
						<Grid sx={{ display: 'flex', alignItems: 'center' }} key={index}>
							<TextField
								label='url'
								variant='outlined'
								fullWidth
								onChange={e => handleUrlChange(index, e)}
								value={element.url}
								sx={{ mt: 2, marginRight: '10px' }}
								required
							/>
							<TextField
								label='Текст'
								variant='outlined'
								fullWidth
								value={element.text}
								onChange={e => handleTextChange(index, e)}
								sx={{ mt: 2, marginLeft: '10px', marginRight: '20px' }}
								required
							/>
							{
								index ?
									<Button
										type='button'
										variant='contained'
										sx={{ marginTop: '15px' }}
										onClick={() => removeFields(index)}
									><CloseIcon /></Button>
									: <div style={{ width: '100px', marginLeft: '20px' }}></div>
							}
						</Grid>
					))}
					<Grid
						sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
						<Button
							variant='contained'
							className='btn btn-outline-success'
							onClick={addInputField}
							sx={{ marginTop: '20px' }}
						>+ Add Link</Button>
						<Button type='submit' onClick={submitFormHandler} variant='contained' sx={{ mt: 2 }}>
							Создать блок с ссылками
						</Button>
					</Grid>
				</Box>
			</Modal>
		</div>
	);
};

export default LinkBLockForm;

