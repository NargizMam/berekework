import React from 'react';
import {Link} from 'react-router-dom';
import {Grid} from '@mui/material';

export interface MainCard {
  _id?: string;
  title: string;
  image: string;
  description: string;
  url: string
}

const MainCardItem: React.FC<MainCard> = ({title, image, description, url}) => {

  return (
    <Link to={url} style={{textDecoration: 'none'}}>
      <Grid item md={6} sm={12} xs={6}>
        <div className="cardMain">
          <div className="cardContent">
            <h5 className="cardTitle">
              {title}
            </h5>
            <p className="cardDescription">
              {description}
            </p>
          </div>
          <img className="cardImage" alt={title} src={image}/>
        </div>
      </Grid>
    </Link>
  );
};

export default MainCardItem;