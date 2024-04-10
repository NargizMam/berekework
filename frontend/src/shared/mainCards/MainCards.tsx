import MainCardItem, { MainCard } from './MainCardItem.tsx';
import { Grid } from '@mui/material';

interface Props {
  data: MainCard[];
}

export const MainCards: React.FC<Props> = ({data}) => {

  return (
    <Grid container spacing={1} direction="row">
      {
        data.map(mainCard => (
          <MainCardItem
            key={mainCard._id}
            title={mainCard.title}
            description={mainCard.description}
            image={mainCard.image}
            url={mainCard.url}
          />
        ))
      }
    </Grid>
  );
};

export default MainCards;