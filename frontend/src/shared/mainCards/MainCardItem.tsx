import React from 'react';
import {Link} from 'react-router-dom';
import {Grid} from '@mui/material';
import { apiURL } from '../../constants';

export interface MainCard {
  _id?: string;
  title: string;
  image?: string;
  icon?: string;
  description: string;
  url: string;
  numImages: number;
}

const MainCardItem: React.FC<MainCard> = ({title, image, icon, description, url, numImages}) => {
  const cardImage = apiURL + '/' + image;
  const cardIcon = apiURL + '/' + icon;

  const cardImageStyle: React.CSSProperties = {
    background: `#ECECEC url(${cardImage}) no-repeat right bottom`,
    backgroundSize: 'contain',
  };

  return (
    <Grid item md={numImages === 1 ? 12 : 6} sm={12} xs={12}>
      <Link to={url} className="cardMain" style={cardImageStyle}>
        {cardIcon && (
          <div className="cardIconWrapper">
            <img className="cardIсon" alt={title} src={cardIcon} />
          </div>
        )}
        <div className="cardContent">
          <h5 className="cardTitle">
            {title}
          </h5>
          <p className="cardDescription">
            {description}
          </p>
        </div>
      </Link>
    </Grid>
  );
};

export default MainCardItem;