import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { apiURL } from '../../../constants.ts';
import MainCardItemStyle from './MainCardItem-style.ts';
import '../../../App.css';
import { Link } from 'react-router-dom';

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
  let cardIcon = icon ? apiURL + '/cards/' + icon : null;
  let cardImage = image ? apiURL + '/cards/' + image : null;

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