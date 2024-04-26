import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import { API_URL } from '../../../../app/constants/links';
import MainCardItemStyle from './MainCardItem-style';

export interface Props {
  _id?: string;
  title: string;
  text: string;
  image?: string;
  icon?: string;
  URLpath?: string;
  numImages: number;
}

const MainCardItem: React.FC<Props> = ({ title, text, image, icon, URLpath, numImages }) => {
  const cardIcon = icon ? API_URL + '/cards/' + icon : null;
  const cardImage = image ? API_URL + '/cards/' + image : null;

  const styles = MainCardItemStyle(cardImage, cardIcon);
  const iconElement = cardIcon ? <CardMedia component="img" sx={styles.icon} image={cardIcon} alt="{title}" /> : null;

  const cardContent = (
    <CardContent sx={styles.content}>
      <Typography variant="h5" sx={styles.title}>
        {title}
      </Typography>
      <Typography variant="body2" sx={styles.text}>
        {text}
      </Typography>
    </CardContent>
  );

  const cardBody = (
    <Card sx={styles.card}>
      {iconElement}
      {cardContent}
    </Card>
  );

  if (URLpath) {
    return (
      <Grid item md={numImages === 1 ? 12 : 6} sm={12} xs={12}>
        <Link to={URLpath} style={{ textDecoration: 'none' }}>
          {cardBody}
        </Link>
      </Grid>
    );
  } else {
    return (
      <Grid item md={numImages === 1 ? 12 : 6} sm={12} xs={12}>
        {cardBody}
      </Grid>
    );
  }
};

export default MainCardItem;
