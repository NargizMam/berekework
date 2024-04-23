import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LastNewsCardItemStyle from './LastNewsCardItem-style';
import '../../../../App.css';

export interface Props {
  id?: string;
  cardTitle: string;
  cardText: string;
  dateTime: Date;
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
    <Card sx={LastNewsCardItemStyle.card}>
      <CardContent sx={LastNewsCardItemStyle.content}>
        <Typography variant="body1" sx={LastNewsCardItemStyle.title}>
          {cardTitle}
        </Typography>
        <Typography variant="body2" sx={LastNewsCardItemStyle.text}>
          {cardText}
        </Typography>
        {createdAt}
      </CardContent>
    </Card>
  );

  if (buttonUrl) {
    return (
      <Grid item md={4}>
        <Link to={buttonUrl} style={{ textDecoration: 'none', height: '100%', display: 'flex' }}>
          {card}
        </Link>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} sm={4} md={4}>
        {card}
      </Grid>
    );
  }
};

export default LastNewsCardItem;
