import React from 'react';
import { Link } from 'react-router-dom';
import './MainCardItem.css';

export interface MainCardApiData {
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  icon?: {
    url: string;
    alt: string;
  };
  link?: string;
}

const MainCardItem: React.FC<MainCardApiData> = ({ title, description, image, icon, link }) => {
  const cardIcon = icon ? icon.url : null;
  const cardImage = image ? image.url : null;

  const iconElement = cardIcon ? (
    <div className="MainCardWithIcon__icon-wrapper">
      <img className="MainCardWithIcon__icon" src={cardIcon} alt={icon?.alt} />
    </div>
  ) : null;

  const imageElement = cardImage ? <img className="MainCardWithImage__image" src={cardImage} alt={image?.alt} /> : null;

  const mainCardWithIconContent = (
    <div className="MainCardWithIcon__content">
      <h5 className="MainCard__title">{title}</h5>
      <p className="MainCard__description">{description}</p>
    </div>
  );

  const mainCardWithImageContent = (
    <div className="MainCardWithImage__content">
      <h5 className="MainCard__title">{title}</h5>
      <p className="MainCard__description">{description}</p>
    </div>
  );

  const cardWithIcon = link ? (
    <Link to={link} className="MainCardWithIcon">
      {iconElement}
      {mainCardWithIconContent}
    </Link>
  ) : (
    <div className="MainCardItemWithIcon">
      {iconElement}
      {mainCardWithIconContent}
    </div>
  );

  const cardWithImage = link ? (
    <Link to={link} className="MainCardWithImage">
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
