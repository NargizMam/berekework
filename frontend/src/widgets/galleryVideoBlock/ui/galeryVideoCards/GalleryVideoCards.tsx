import { Grid } from '@mui/material';
import { GalleryVideoCardApiData } from '../../model/types';
import GalleryVideoCardItem from './GalleryVideoCardItem';
import GalleryVideoCardsStyle from './GalleryVideoCards-style';

interface Props {
  startIndex: number;
  pageSize?: number;
  cards: GalleryVideoCardApiData[];
  isPaginationEnabled: boolean;
}

export const GalleryVideoCards: React.FC<Props> = ({ cards, pageSize, startIndex, isPaginationEnabled }) => {
  let cardsToDisplay = cards;

  if (isPaginationEnabled && pageSize) {
    cardsToDisplay = cards.slice(startIndex, startIndex + pageSize);
  }

  return (
    <Grid container spacing={1} direction="row" sx={GalleryVideoCardsStyle.container}>
      {cardsToDisplay.map((card) => (
        <GalleryVideoCardItem key={card._id} image={card.image} video={card.video} />
      ))}
    </Grid>
  );
};

export default GalleryVideoCards;
