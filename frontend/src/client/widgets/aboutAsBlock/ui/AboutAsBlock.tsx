import { Box, Typography } from '@mui/material';
import React from 'react';

interface InfoItem {
	aboutusdescription: Array<{
		type: string;
		text: string;
		spans: any[];
	}>;
}

interface AboutUsInfoProps {
	id: string;
	items: InfoItem[];
	primary: {
		aboutustitle: Array<{
			type: string;
			text: string;
			spans: any[];
		}>;
	};
}

interface Props {
	slice: AboutUsInfoProps;
}

export const AboutUsBlock: React.FC<Props> = ({ slice }) => {
	return (
		<Box id='about-us' key={slice.id} sx={{ marginBottom: { xs: '7%', md: '161px' }, marginTop: { xs: '7%', md: '180px' } }}>
			{slice.primary.aboutustitle && slice.primary.aboutustitle[0] && (
				<Typography
					variant='h4'
					sx={{
						fontSize: { xs: '1.5rem', sm: '2rem', md: '2.875rem' },
						fontWeight: 700,
						lineHeight: 1.3,
						color: '#000',
						marginBottom: { xs: '7%', md: '60px' }
					}}
				>
					{slice.primary.aboutustitle[0].text}
				</Typography>
			)}
			
			{slice.items.map((item, index) => (
				<Box key={index} sx={{ marginBottom: { xs: '7%', md: '40px' } }}>
					{item.aboutusdescription && item.aboutusdescription[0] && (
						<Typography
							component='span'
							variant='body1'
							sx={{
								color: '#777',
								fontSize: '1.125rem',
								fontWeight: 500,
								lineHeight: 1.44
							}}
						>
							{item.aboutusdescription && item.aboutusdescription[0] && (
								<Typography
									component='span'
									variant='body1'
									sx={{
										fontSize: '1.25rem',
										fontWeight: 600,
										color: '#000',
										padding: 0,
										lineHeight: 1.1
									}}
								>
									{item.aboutusdescription[0].text}{' '}
								</Typography>
							)}
							{index === 0 ? (
								<Typography component='span' variant='body1'>
									{item.aboutusdescription[1].text}
								</Typography>
							) : (
								<Box component='span' sx={{ display: 'block', marginTop: '10px' }}>
									<Typography component='span' variant='body1'>
										{item.aboutusdescription[1].text}
									</Typography>
								</Box>
							)}
						</Typography>
					)}
				</Box>
			))}
		</Box>
	);
};
