import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Card, Link, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LastNewsCardItemStyle from './LastNewsCardItem-style';

export interface Props {
  cardTitle: string;
  cardText: string;
  dateTime: string;
  buttonUrl?: string;
}

const LastNewsCardItem: React.FC<Props> = ({ cardTitle, cardText, dateTime, buttonUrl }) => {
  const dateTimeData = dayjs(dateTime);
  const timeString = dateTimeData.format('HH:mm');
  const dateString = dateTimeData.format('DD.MM');

  const createdAt = (
    <Box sx={LastNewsCardItemStyle.createdAt}>
      <Box sx={LastNewsCardItemStyle.createdAtContent}>
        <Typography variant="body2" sx={LastNewsCardItemStyle.createdAtText}>
          <span style={{ fontWeight: '600' }}>Время: </span>
          {timeString}
        </Typography>
        <Typography variant="body2" sx={LastNewsCardItemStyle.createdAtText}>
          <span style={{ fontWeight: '600' }}>Дата: </span>
          {dateString}
        </Typography>
      </Box>
      <Box sx={LastNewsCardItemStyle.arrowIconWrapper}>
        <ArrowOutwardIcon />
      </Box>
    </Box>
  );

  const card = (
    <>
      <Typography variant="body1" sx={LastNewsCardItemStyle.title}>
        {cardTitle}
      </Typography>
      <Typography variant="body2" sx={LastNewsCardItemStyle.text}>
        {cardText}
      </Typography>
      {createdAt}
    </>
  );

  if (buttonUrl) {
    return (
      <Link component={RouterLink} to={buttonUrl} sx={LastNewsCardItemStyle.card}>
        {card}
      </Link>
    );
  } else {
    return <Card sx={LastNewsCardItemStyle.card}>{card}</Card>;
  }
};

export default LastNewsCardItem;
