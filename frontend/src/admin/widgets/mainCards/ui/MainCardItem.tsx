import React from 'react';
import { Link } from 'react-router-dom';
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
}

const MainCardItem: React.FC<Props> = ({ title, text, image, icon, URLpath }) => {
  const cardIcon = icon ? API_URL + icon : null;
  const cardImage = image ? API_URL + image : null;

  const styles = MainCardItemStyle(cardIcon);

  const iconElement = cardIcon ? <img className="MainCardItem__card-icon" src={cardIcon} alt={title} /> : null;

  const imageElement = cardImage ? <img className="MainCardItem__card-image" src={cardImage} alt={title} /> : null;

  const cardContent = (
    <div>
      <h5 className="MainCardItem__card-title">{title}</h5>
      <p className="MainCardItem__card-text">{text}</p>
    </div>
  );

  const card = (
    <>
      {cardImage ? (
        <>
          {cardContent}
          {imageElement}
        </>
      ) : (
        <>
          {iconElement}
          {cardContent}
        </>
      )}
    </>
  );

  return URLpath ? (
    <Link to={URLpath} style={styles.card} className="MainCardItem__card">
      {card}
    </Link>
  ) : (
    <div style={styles.card} className="MainCardItem__card">
      {card}
    </div>
  );
};

export default MainCardItem;
