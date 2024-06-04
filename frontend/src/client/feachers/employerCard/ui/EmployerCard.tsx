import { Avatar, Typography } from '@mui/material';
import React from 'react';
import noImage from '../../../../shared/assets/NoImage.png';
import './EmployerCard.css';

interface EmployerCardProps {
  data: {
    emplinfo: { type: string; text: string }[];
    image: { url: string };
    id: string;
  };
}

const EmployerCard: React.FC<EmployerCardProps> = ({ data }) => {
  return (
    <div className="EmployerCard">
      <Avatar
        src={data.image.url ? data.image.url : noImage}
        alt={data.emplinfo[0].text}
        sx={{ height: '130px', width: '130px' }}
      />
      <Typography variant="h6" sx={{ width: '50%', mt: '10px' }}>
        {data.emplinfo[0].text}
      </Typography>
      <Typography>{data.emplinfo[1].text}</Typography>
    </div>
  );
};

export default EmployerCard;
