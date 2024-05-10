import React from 'react';
import { Link } from 'react-router-dom';
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

  // const styles = MainCardItemStyle(cardIcon);

  const iconElement = cardIcon ? <img className="MainCardItem__card-icon" src={cardIcon} alt={title} /> : null;

  const imageElement = cardImage ? (
    <div className="MainCardItem__image-wrapper">
      <img className="MainCardItem__card-image" src={cardImage} alt={title} />
    </div>
  ) : null;

  const cardContent = (
    <div className="MainCardItem__card-content">
      <h5 className="MainCardItem__card-title">{title}</h5>
      <p className="MainCardItem__card-text">{text}</p>
    </div>
  );

  const card = (
    <>
      {cardImage ? (
        <div className="MainCardItem__cardWithImage">
          {cardContent}
          {imageElement}
        </div>
      ) : (
        <div className="MainCardItem__cardWithIcon">
          {iconElement}
          {cardContent}
        </div>
      )}
    </>
  );

  return URLpath ? (
    <Link to={URLpath} className="MainCardItem__card-link">
      {card}
    </Link>
  ) : (
    <>{card}</>
  );
};

export default MainCardItem;
