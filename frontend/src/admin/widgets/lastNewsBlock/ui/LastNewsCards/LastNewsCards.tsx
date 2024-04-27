import { Grid } from '@mui/material';
import LastNewsCardItem from './LastNewsCardItem';
import LastNewsCardsStyle from './LastNewsCards-style';
import { Card } from '../../../lastNews/cards/cardTypes';

interface Props {
  startIndex: number;
  pageSize?: number;
  cards: Card[];
  isPaginationEnabled: boolean;
}

export const LastNewsCards: React.FC<Props> = ({ cards, pageSize, startIndex, isPaginationEnabled }) => {
  let cardsToDisplay = cards;

  if (isPaginationEnabled && pageSize) {
    cardsToDisplay = cards.slice(startIndex, startIndex + pageSize);
  }

  return (
    <Grid container spacing={1} direction="row" sx={LastNewsCardsStyle.container}>
      {cardsToDisplay.map((card) => (
        <LastNewsCardItem
          key={card.id}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          dateTime={card.dateTime}
          buttonUrl={card.buttonUrl}
        />
      ))}
    </Grid>
  );
};

export default LastNewsCards;
