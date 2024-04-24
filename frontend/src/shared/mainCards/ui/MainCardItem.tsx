import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import '../../../App.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../app/constants/links';
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
  const cardIcon = icon ? API_URL + icon : null;
  const cardImage = image ? API_URL + image : null;

  const styles = MainCardItemStyle(cardIcon);

  const iconElement = cardIcon ? <CardMedia component="img" sx={styles.icon} image={cardIcon} alt="{title}" /> : null;
  const imageElement = cardImage ? (
    <CardMedia component="img" sx={styles.image} image={cardImage} alt="{title}" />
  ) : null;

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
      {iconElement ? iconElement : imageElement}
      {cardContent}
    </Card>
  );

  if (URLpath) {
    return (
      <Grid item md={numImages === 1 ? 12 : 6} sm={12} xs={12} sx={{ height: '100%' }}>
        <Link to={URLpath} style={{ textDecoration: 'none', height: '100%' }}>
          {cardBody}
        </Link>
      </Grid>
    );
  } else {
    return (
      <Grid item md={numImages === 1 ? 12 : 6} sm={12} xs={12} sx={{ height: '100%' }}>
        {cardBody}
      </Grid>
    );
  }
};

export default MainCardItem;
