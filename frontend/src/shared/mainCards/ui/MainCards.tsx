import { Grid } from '@mui/material';
import MainCardItem from './MainCardItem';
import { selectMainCards } from '../model/mainCardsSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks.ts';
import { fetchMainCards } from '../api/mainCardsThunks.ts';
import { useEffect } from 'react';

export const MainCards = () => {
  const dispatch = useAppDispatch();
  const mainCards = useAppSelector(selectMainCards);
  const numImages = mainCards.length;

  useEffect(() => {
    dispatch(fetchMainCards());
  }, [dispatch]);

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
