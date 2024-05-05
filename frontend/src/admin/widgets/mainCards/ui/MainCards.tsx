import MainCardItem from './MainCardItem';
import { useEffect } from 'react';
import { selectMainCards } from '../model/mainCardsSlice';
import { fetchMainCards } from '../model/mainCardsThunks';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';

export const MainCards = () => {
  const dispatch = useAppDispatch();
  const mainCards = useAppSelector(selectMainCards);
  const numImages = mainCards.length;

  useEffect(() => {
    dispatch(fetchMainCards());
  }, [dispatch]);

  return (
    <div className="Main-cards__container">
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
    </div>
  );
};

export default MainCards;
