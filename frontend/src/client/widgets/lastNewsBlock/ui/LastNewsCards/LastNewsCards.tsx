import LastNewsCardItem from './LastNewsCardItem';
import LastNewsCardsStyle from './LastNewsCards-style';
import React from 'react';
import { Box } from '@mui/material';
import { LastNewsCard } from '../LastNewsBlock';

interface Props {
  startIndex: number;
  pageSize?: number;
  cards: LastNewsCard[];
  isPaginationEnabled: boolean;
}

export const LastNewsCards: React.FC<Props> = ({ cards, pageSize, startIndex, isPaginationEnabled }) => {
  let cardsToDisplay = cards;

  if (isPaginationEnabled && pageSize) {
    cardsToDisplay = cards.slice(startIndex, startIndex + pageSize);
  }

  return (
    <Box sx={LastNewsCardsStyle.container}>
      {cardsToDisplay.map((card) => (
        <LastNewsCardItem
          key={card._id}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          dateTime={card.dateTime}
          buttonUrl={card.buttonUrl}
        />
      ))}
    </Box>
  );
};

export default LastNewsCards;
