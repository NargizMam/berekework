import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import noImage from '../../../../shared/assets/NoImage.png';

// import './EmployerCard.css';

interface EmployerCardProps {
  data: {
    emplinfo: { type: string; text: string }[];
    image: { url: string };
    id: string;
  };
}

const EmployerCard: React.FC<EmployerCardProps> = ({ data }) => {
  const fullName = data.emplinfo[0].text;
  const [firstName, lastName] = fullName.split(' ');

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <Avatar
        src={data.image.url ? data.image.url : noImage}
        alt={data.emplinfo[0].text}
        sx={{ height: '130px', width: '130px', mb: '30px' }}
      />
      <Typography
        variant='h6'
        sx={{
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: 1.1,
          color: '#000',
          textAlign: 'center',
        }}>
        {firstName}
      </Typography>
      <Typography
        variant='h6'
        sx={{
          mb: '20px',
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: 1.1,
          color: '#000',
          textAlign: 'center',
        }}>
        {lastName}
      </Typography>
      <Typography sx={{
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.4,
        color: '#8E8E8E',
        textAlign: 'center',
      }}>
        {data.emplinfo[1].text}
      </Typography>
    </Box>
  );
};

export default EmployerCard;
