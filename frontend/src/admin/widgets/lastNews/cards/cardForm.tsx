import React, { useState } from 'react';
import { Grid, IconButton, Paper, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Card } from './cardTypes';

interface Props {
  cardId: string,
  card: Card | null,
  addCard: (newCardState: Card) => void;
  deleteCard: (id: string) => void,
}

const CardForm: React.FC<Props> = ({card, cardId, addCard, deleteCard}) => {
  const [cardState, setCardState] = useState<Card>({
    id: cardId,
    cardTitle: card?.cardTitle || '',
    cardText: card?.cardText || '',
    buttonUrl: card?.buttonUrl || '',
    dateTime: new Date(),
  });
  const [isAdded, setIsAdded] = useState(false);

  const cardChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCardState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDeleteCard = (id: string) => {
    deleteCard(id);
  };

  const addCardToBlockState = () => {
    addCard({...cardState});
    setIsAdded(true);
  };

  return (
    <Grid item display="flex" mb={2}>
      <Paper elevation={3} sx={{
        width: 280,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '20px',
        paddingTop: '20px'
      }}>
        <Grid>
          <TextField
            id="cardTitle"
            label={`Заголовок новости`}
            value={cardState.cardTitle}
            onChange={cardChangeHandler}
            name="cardTitle"
            variant="standard"
          />
        </Grid>
        <Grid>
          <TextField
            id="cardText"
            label={`Описание новости`}
            value={cardState.cardText}
            onChange={cardChangeHandler}
            name="cardText"
            variant="standard"
          />
        </Grid>
        <Grid>
          <TextField
            id="buttonUrl"
            label={`Ссылка на новость`}
            value={cardState.buttonUrl}
            onChange={cardChangeHandler}
            name="buttonUrl"
            variant="standard"
          />
        </Grid>
      </Paper>
      {!isAdded ?
        <IconButton onClick={addCardToBlockState} aria-label="delete" color="primary">
          <CheckIcon/>
        </IconButton>
        :
        <IconButton onClick={() => handleDeleteCard(cardState.id)} aria-label="delete" color="primary">
          <DeleteIcon/>
        </IconButton>
      }
    </Grid>
  );
};

export default CardForm;