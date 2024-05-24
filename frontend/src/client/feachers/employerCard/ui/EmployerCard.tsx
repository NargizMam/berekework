import { Avatar, Typography } from '@mui/material';
import React from 'react';
import noImage from '../../../../shared/assets/NoImage.png';
import EmployerCardStyle from './EmployerCard-style';
import './EmployerCard.css';

export interface EmployerCardApiData {
  id: string;
  primary: {
    'employer-image': { url: string };
    'employer-job-title': { text: string }[];
    'employer-name': { text: string }[];
  };
  name: string;
  jobTitle: string;
  image?: string;
}

interface Props {
  data: EmployerCardApiData;
  viseble: boolean;
}

const EmployerCard: React.FC<Props> = ({ data, viseble }) => {
  return (
    <div className="EmployerCard" style={{ display: viseble ? 'flex' : 'none' }}>
      <Avatar
        src={data.primary['employer-image'].url ? data.primary['employer-image'].url : noImage}
        alt={data.primary['employer-name'][0].text}
        sx={EmployerCardStyle.avatar}
      />
      <Typography sx={EmployerCardStyle.name}>{data.primary['employer-name'][0].text}</Typography>
      <Typography sx={EmployerCardStyle.jobTitle}>{data.primary['employer-job-title'][0].text}</Typography>
    </div>
  );
};

export default EmployerCard;
