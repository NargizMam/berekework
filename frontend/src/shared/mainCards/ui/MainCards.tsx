import { Grid } from '@mui/material';
import MainCardItem from './MainCardItem';
import { selectMainCards } from '../model/mainCardsSlice.ts';
import { useAppSelector } from '../../../app/store/hooks.ts';

export const MainCards = () => {
  const mainCards = useAppSelector(selectMainCards);
  const numImages = mainCards.length;

  return (
    <Grid container spacing={1} direction="row">
      {mainCards.map((mainCard) => (
        <MainCardItem
          key={mainCard._id}
          title={mainCard.title}
          text={mainCard.text}
          image={mainCard.image}
          URLpath={mainCard.URLpath}
          icon={mainCard.icon}
          numImages={numImages}
        />
      ))}
    </Grid>
  );
};

export default MainCards;
