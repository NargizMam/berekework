import * as React from 'react';
import { Button, CardActions, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './InterestedVacancies.css';
import logo from './images/logo.png';

const InterestedVacancies = () => {
	
	const card = (
		<React.Fragment>
			<CardContent>
				<Typography sx={{
					fontSize: 14,
					background: '#F0F0F0',
					padding: '10px 20px',
					borderRadius: '30px',
					width: '172px',
					fontWeight: '500',
					color: 'black',
					textAlign: 'center',
				}} color="text.secondary" gutterBottom>
					На рассмотрении
				</Typography>
				<img className='logo' src={logo} alt='logo'/>
				<Typography sx={{
					fontSize: 14,
					fontWeight: '600',
					marginTop: '40px'
				}} component="div">
					Менеджер по продажам услуг
				</Typography>
				<Typography sx={{
					color: '#8E8E8E',
					margin: '30px 0 20px 0'
				}} color="text.secondary">
					Satcom, Бишкек
				</Typography>
				<Typography sx={{
					fontSize: 20,
					fontWeight: '600',
					color: '#00000'
				}} variant="body2">
					от 25 000 до 35 000 сом
				</Typography>
				<Typography sx={{
					fontSize: 14,
					color: '#8E8E8E',
					marginTop: '20px'
				}}>
					<span style={{
						color: 'black',
						marginRight: '5px'
					}}>Дата:</span> 21.04.2024
				</Typography>
			</CardContent>
			<CardActions sx={{
				display: 'flex',
				flexDirection: 'column',
			}}>
				<Button sx={{
					width: '340px',
					fontSize: 20,
					lineHeight: '20px',
					textAlign: 'center',
					backgroundColor: '#FFE585',
					color: '#000000',
					textTransform: 'none',
					padding: '20px 108px',
					borderRadius: '30px',
					fontWeight: '600',
				}}>Связаться</Button>
				<Button sx={{
					width: '340px',
					fontSize: 20,
					lineHeight: '20px',
					textAlign: 'center',
					backgroundColor: '#E9E9E9',
					color: '#000000',
					textTransform: 'none',
					padding: '20px 108px',
					borderRadius: '30px',
					fontWeight: '600',
					marginTop: '10px'
				}}>Отозвать</Button>
			</CardActions>
		</React.Fragment>
	);
	
	return (
		<div className="interested-vacancies-block">
			<h6 className="interested-vacancies-title">Заинтересованные вами</h6>
			<div className='cards-div'>
				<Card sx={{
					width: '420px',
					borderRadius: '30px',
					padding: '40px',
					boxSizing: 'border-box',
					gap: '30px'
				}} variant="outlined">{card}</Card>
				<Card sx={{
					width: '420px',
					borderRadius: '30px',
					padding: '40px',
					boxSizing: 'border-box',
					gap: '30px'
				}} variant="outlined">{card}</Card>
				<Card sx={{
					width: '420px',
					borderRadius: '30px',
					padding: '40px',
					boxSizing: 'border-box',
					gap: '30px'
				}} variant="outlined">{card}</Card>
			</div>
		</div>
	);
};

export default InterestedVacancies;