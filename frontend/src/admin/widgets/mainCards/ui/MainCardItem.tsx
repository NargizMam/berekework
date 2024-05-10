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

  const iconElement = cardIcon ? (
    <div className="MainCardWithIcon__icon-wrapper">
      <img className="MainCardWithIcon__icon" src={cardIcon} alt={title} />
    </div>
  ) : null;

  const imageElement = cardImage ? <img className="MainCardWithImage__image" src={cardImage} alt={title} /> : null;

  const mainCardWithIconContent = (
    <div className="MainCardWithIcon__content">
      <h5 className="MainCard__title">{title}</h5>
      <p className="MainCard__text">{text}</p>
    </div>
  );

  const mainCardWithImageContent = (
    <div className="MainCardWithImage__content">
      <h5 className="MainCard__title">{title}</h5>
      <p className="MainCard__text">{text}</p>
    </div>
  );

  const cardWithIcon = URLpath ? (
    <Link to={URLpath} className="MainCardWithIcon">
      {iconElement}
      {mainCardWithIconContent}
    </Link>
  ) : (
    <div className="MainCardItemWithIcon">
      {iconElement}
      {mainCardWithIconContent}
    </div>
  );

  const cardWithImage = URLpath ? (
    <Link to={URLpath} className="MainCardWithImage">
      {mainCardWithImageContent}
      {imageElement}
    </Link>
  ) : (
    <div className="MainCardWithImage">
      {mainCardWithImageContent}
      {imageElement}
    </div>
  );

  return cardImage ? cardWithImage : cardWithIcon;
};

export default MainCardItem;
