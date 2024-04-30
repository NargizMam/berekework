import React, {useEffect, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {LoadingButton} from "@mui/lab";
import { Card } from '../cards/cardTypes';
import { Block, BlockMutation } from './blockTypes';
import CardForm from '../cards/cardForm';


interface Props {
    block: Block | null,
    onSubmit: (mutation: BlockMutation) => void;
    loading: boolean;
}

const BlockForm: React.FC<Props> = ({block, onSubmit, loading}) => {
    const [state, setState] = useState<BlockMutation | Block>({
        page: '1', //заменить при наличии pageId
        title: block?.title || '',
        cards: block?.cards || []
    });
    const [cardForm, setCardForm] = useState<React.ReactNode[]>([]);

    console.log(cardForm);

    useEffect(() => {
        if (block) {
            setCardForm(
                block.cards.map(card => (
                    <CardForm
                        key={card.id}
                        card={card}
                        cardId={card.id}
                        addCard={addCardToBlockState}
                        deleteCard={deleteCard}
                    />
                ))
            );
        }
    }, [block]);


    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (state.cards.length === 0) {
            window.alert('Хотя бы одна карточка должна быть заполнена')
        } else {
            onSubmit(state);
            setState({
                page: '1',  //заменить при наличии pageId
                title: '',
                cards: []
            });
            setCardForm([]);
        }
    };

    const addCardToBlockState = (newCard: Card) => {
        const existingCardId = state.cards.findIndex(card => card.id === newCard.id);

        if (existingCardId !== -1) {
            setState(prevState => ({
                ...prevState,
                cards: prevState.cards.map((card, index) =>
                    index === existingCardId ? newCard : card
                )
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                cards: [...prevState.cards, newCard]
            }));
        }
    };

    const deleteCard = (id: string) => {
        setState(prevState => ({
            ...prevState,
            cards: prevState.cards.filter((card) => card.id !== id)
        }));
        setCardForm(prevState => prevState.filter(form => {
            if (React.isValidElement(form)) {
                return form.key !== id;
            }
            return true;
        }));
    };
    const addCardForm = () => {
        const cardId = crypto.randomUUID();
        setCardForm(prevState => ([
            ...prevState,
            <CardForm
                key={cardId}
                card={null}
                cardId={cardId}
                addCard={addCardToBlockState}
                deleteCard={deleteCard}
            />
        ]));
    };


    return (
        <div>
            <form
                autoComplete="off"
                onSubmit={submitFormHandler}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            id="title" label="Заголовок блока"
                            value={state.title}
                            onChange={(e) => setState(prevState => ({...prevState, title: e.target.value}))}
                            name="title"
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <Button sx={{marginTop: '10px'}} onClick={() => addCardForm()}>Добавить
                            карточку<AddIcon/></Button>
                    </Grid>
                    <Grid display='flex' mt={2} flexWrap={"wrap"}>
                        {cardForm.map(field => field)}
                    </Grid>
                    <Grid item xs>
                        <LoadingButton
                            type="submit"
                            color="primary"
                            variant="contained"
                            loading={loading}
                        >
                            {block ? 'Изменить' : 'Создать'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default BlockForm;