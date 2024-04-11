import MainCardItem, { MainCard } from './MainCardItem.tsx';
import { Grid } from '@mui/material';

interface Props {
  data: MainCard[];
}

export const MainCards: React.FC<Props> = ({ data }) => {
  const numImages = data.length;

  return (
    <Grid container spacing={1} direction="row">
      {data.map((mainCard) => (
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
