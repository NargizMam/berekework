import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { apiURL } from '../../../constants.ts';
import MainCardItemStyle from './MainCardItem-style.ts';

export interface Props {
  _id?: string;
  title: string;
  text: string;
  image?: string;
  icon?: string;
  URLpath: string;
  numImages: number;
}

const MainCardItem: React.FC<Props> = ({ title, text, image, icon, URLpath, numImages }) => {
  const cardImage = apiURL + '/' + image;
  const cardIcon = apiURL + '/' + icon;
  const styles = MainCardItemStyle(cardImage);

  const iconElement = icon ? <CardMedia component="img" height="140" image={cardIcon} alt="{title}" /> : null;

  return (
    <Grid item md={numImages === 1 ? 12 : 6} sm={12} xs={12}>
      <Link to={URLpath}>
        <Card sx={styles.card}>
          {iconElement}
          <CardContent sx={styles.content}>
            <Typography variant="h5" sx={styles.title}>
              {title}
            </Typography>
            <Typography variant="body2" sx={styles.text}>
              {text}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default MainCardItem;
