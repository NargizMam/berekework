import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import LinkBLockForm from '../../../widgets/footerAdminForms/LInksBlockForm/LinkBLockForm';
import React, { useEffect, useState } from 'react';
import ContactsBlockForm from '../../../widgets/footerAdminForms/ContactsBlockForm/ContactsBlockForm';
import CopyrightForm from '../../../widgets/footerAdminForms/CopyrightForm/CopyrightForm';
import LogoAdminForm from '../../../widgets/footerAdminForms/LogoAdminForm/LogoAdminForm';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectFooter } from '../model/FooterSlice';
import { fetchFooterData } from '../api/FooterThunk';
import FooterLinksBlock from '../../../widgets/footerLInksBlock/footerLinksBlock';
import FooterContactsBlock from '../../../widgets/footerContactsBlock/footerContactsBlock';
import FooterLogo from '../../../widgets/footerLogo/footerLogo';
import FooterCopyrightAdmin from '../../../widgets/footerCopyrightAdmin/footerCopyrightAdmin';
import '../css/footer.css';

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

const FooterAdmin: React.FC = () => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const [openLinks, setOpenLinks] = useState(false);
	const [openContact, setOpenContact] = useState(false);
	const [openCopyright, setOpenCopyright] = useState(false);
	const [openLogo, setOpenLogo] = useState(false);
	const footer = useAppSelector(selectFooter);
	
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const openLinksFunc = () => setOpenLinks(true);
	const openContactFunc = () => setOpenContact(true);
	const openCopyrightFunc = () => setOpenCopyright(true);
	const openLogoFunc = () => setOpenLogo(true);
	
	useEffect(() => {
		dispatch(fetchFooterData());
	}, [dispatch]);
	
	console.log(footer);
	
	return (
		<>
			<div>
				<h1>#Footer Admin</h1>
				<div style={{ marginTop: '70px' }}>
					<h2>Блоки с ссылками:</h2>
					{footer.map((footerItem, index) => (
						<div key={index}>
							<FooterLinksBlock footerBlocks={footerItem.footerLinks} key={index} />
						</div>
					))}
				</div>
				<div>
					<h2>Блок с контактными данными:</h2>
					{footer.map((footerItem, index) => (
						<div key={index}>
							<FooterContactsBlock contactBlock={footerItem.contactDetails} key={index} />
						</div>
					))}
				</div>
				<div>
					<h2>Лого:</h2>
					{footer.map((footerItem, index) => (
						<div key={index}>
							<FooterLogo image={footerItem.logo} key={index} />
						</div>
					))}
				</div>
				<div>
					<h2>Копирайт</h2>
					{footer.map((footerItem, index) => (
						<div key={index}>
							<FooterCopyrightAdmin text={footerItem.copyright} key={index} />
						</div>
					))}
				</div>
				<Button
					sx={{marginTop: "50px"}}
					onClick={handleOpen}
					variant='contained'>
					Создайте свой футер
				</Button>
			</div>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							Выберите компонент который хотите создать:
						</Typography>
						<Grid container>
							<Button
								sx={{ margin: '20px 0' }}
								className='footer-btn'
								onClick={openLinksFunc}
								variant='contained'>
								Создать блок с ссылками
							</Button>
							<Button
								sx={{ margin: '20px 0' }}
								className='footer-btn'
								variant='contained'
								onClick={openLogoFunc}>
								Добавить логотип
							</Button>
							<Button
								sx={{ margin: '20px 0' }}
								className='footer-btn'
								variant='contained'>
								Добавить блок с соц. сетями
							</Button>
							<Button
								sx={{ margin: '20px 0' }}
								className='footer-btn'
								onClick={openContactFunc}
								variant='contained'>
								Добавить свои контактные данные
							</Button>
							<Button
								sx={{ margin: '20px 0' }}
								className='footer-btn'
								onClick={openCopyrightFunc}
								variant='contained'>
								Добавить свой копирайт
							</Button>
						</Grid>
					</Box>
				</Modal>
			</div>
			{openLinks && <LinkBLockForm onClose={() => setOpenLinks(false)} open={openLinks} />}
			{openContact && <ContactsBlockForm onClose={() => setOpenContact(false)} open={openContact} />}
			{openCopyright && <CopyrightForm onClose={() => setOpenCopyright(false)} open={openCopyright} />}
			{openLogo && <LogoAdminForm onClose={() => setOpenLogo(false)} open={openLogo} />}
		</>
	);
};

export default FooterAdmin;
