import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import MainCardItemStyle from './MainCardItem-style';
import { API_URL } from '../../../../app/constants/links';
import './MainCardItem.css';

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

  const styles = MainCardItemStyle(cardIcon, cardImage);

  const iconElement = cardIcon ? <img style={styles.icon} src={cardIcon} alt="{title}" /> : null;
  // const imageElement = cardImage ? <div style={styles.image}>ппп</div> : null;

  // const imageElement = cardImage ? (
  //   <CardMedia component="img" sx={styles.image} image={cardImage} alt="{title}" />
  // ) : null;

  // const imageElement = cardImage ? <div style={styles.image}></div> : null;

  const cardContent = (
    <div style={styles.content}>
      <h5 style={styles.title}>{title}</h5>
      <p style={styles.text}>{text}</p>
    </div>
  );

  const cardBody = (
    <div style={styles.card}>
      {cardImage ? (
        <>
          {cardContent}
          {/*{imageElement}*/}
        </>
      ) : (
        <>
          {iconElement}
          {cardContent}
        </>
      )}
    </div>
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
