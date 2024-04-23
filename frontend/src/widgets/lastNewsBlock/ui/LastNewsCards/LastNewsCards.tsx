import LastNewsCardItem from './LastNewsCardItem';
import { LastNewsCardApiData } from '../../model/types';
import { Grid } from '@mui/material';
import LastNewsCardsStyle from './LastNewsCards-style';

interface Props {
  startIndex: number;
  pageSize?: number;
  cards: LastNewsCardApiData[];
  isPaginationEnabled: boolean;
}

export const LastNewsCards: React.FC<Props> = ({ cards, pageSize, startIndex, isPaginationEnabled }) => {
  let cardsToDisplay = cards;

  if (isPaginationEnabled && pageSize) {
    cardsToDisplay = cards.slice(startIndex, startIndex + pageSize);
  }

  return (
    <Grid container spacing={2} direction="row" sx={LastNewsCardsStyle.container}>
      {cardsToDisplay.map((card) => (
        <LastNewsCardItem
          key={card._id}
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
