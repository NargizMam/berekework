import { Avatar, Typography } from '@mui/material';
import React from 'react';
import noImage from '../../../../shared/assets/NoImage.png';
import EmployerCardStyle from './EmployerCard-style';
import './EmployerCard.css';

export interface EmployerCardApiData {
  _id: string;
  name: string;
  jobTitle: string;
  image?: string;
}

interface Props {
  data: EmployerCardApiData;
  viseble: boolean;
}

const EmployerCard: React.FC<Props> = ({ data, viseble}) => {
  return (
    <div className="EmployerCard" style={{ display: viseble ? 'flex' : 'none' }}>
      <Avatar src={data.image ? data.image : noImage} alt={data.name} sx={EmployerCardStyle.avatar} />
      <Typography sx={EmployerCardStyle.name}>{data.name}</Typography>
      <Typography sx={EmployerCardStyle.jobTitle}>{data.jobTitle}</Typography>
    </div>
  );
};

export default EmployerCard;
