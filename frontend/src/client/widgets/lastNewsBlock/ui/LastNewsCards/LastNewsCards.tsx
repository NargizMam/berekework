import React from 'react';
import { Box } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import './LastNews.css';
import dayjs from 'dayjs';

interface Props {
  title: string;
  description: string;
  date: string;
  link: {
    target: string;
    url: string;
  };
}

export const LastNewsCards: React.FC<Props> = ({title, description, link, date}) => {
  const formattedDate = dayjs(date).format('DD.MM');
  const formattedTime = dayjs(date).format('HH:mm');

  return (
    <>
      <Box className="newsCard">
        <p className="newsCardTitle">{title}</p>
        <div className="rateCardTextBlocks">
          <div className="rateCardTextBlock">
            <p className="newsCardText">{description}</p>
          </div>
        </div>
        <div className="lastNewsDateTimeLink">
          <p className="cardDateText"><strong>Дата: </strong>{formattedDate}</p>
          <p className="cardDateText"><strong>Время:</strong> {formattedTime}</p>
          <a className="cardBtnLink" target={link.target} href={link.url}><ArrowOutwardIcon/></a>
        </div>
      </Box>
    </>
  );
};

export default LastNewsCards;
