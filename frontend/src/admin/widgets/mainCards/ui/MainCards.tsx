import MainCardItem, { MainCardApiData } from './MainCardItem';
import './MainCards.css';
import React from 'react';

interface MainCardsApiData {
  items: MainCardApiData[];
}

interface Props {
  slice: MainCardsApiData;
}

export const MainCards: React.FC<Props> = ({ slice }) => {
  console.log('Slice data:', slice);
  const { items } = slice;

  console.log('MainCards items:', items);
  return (
    <div className="Main-cards__container">
      {items.map((mainCard, index) => (
        <MainCardItem
          key={index}
          title={mainCard.title}
          description={mainCard.description}
          image={mainCard.image}
          link={mainCard.link}
          icon={mainCard.icon}
        />
      ))}
    </div>
  );
};
