import React from 'react';
import { Typography } from '@mui/material';
import UserPageCard, { CardProps } from '../../UserPageCard/ui/UserPageCard';
import './CardBlock.css';
import CardBlockStyle from './CardBlock-style';

interface Props {
  data: CardProps[];
}

const CardBlock: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Typography sx={CardBlockStyle.title}>Заинтересованные вами</Typography>
      <div className="CardBlock">
        {data.map((data: CardProps, index: number) => (
          <UserPageCard key={index} data={data} />
        ))}
      </div>
    </>
  );
};

export default CardBlock;
