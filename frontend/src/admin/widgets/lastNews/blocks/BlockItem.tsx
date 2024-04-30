import React from 'react';
import {Grid, Paper, Typography, CardContent, IconButton, Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import {Link} from "react-router-dom";
import { Card } from '../cards/cardTypes';
import { deleteBlock, fetchBlocks } from './model/blockThunk';
import { useAppDispatch } from '../../../../app/store/hooks';

interface Props {
    blockId: string, 
    title: string,
    cards: Card[],
}

const BlockItem: React.FC<Props> = ({blockId, title, cards}) => {
    const dispatch = useAppDispatch();
    const deleteBLockHandler = (id: string) => {
        try {
            dispatch(deleteBlock(id)).unwrap;
            dispatch(fetchBlocks('1')); //заменить на id страницы
        } catch {
            ///
        }
    };

    return (
        <>
         <Paper elevation={3} sx={{margin: 2, padding: 2}} >
             <Grid display='flex'>
                 <Typography variant='h5' mb={2}>{title}</Typography>
                 <Grid  sx={{marginLeft: 'auto'}}>
                     <Button component={Link} to={`/block/${blockId}`} color="primary">
                         <ModeEditOutlineIcon/>
                     </Button>
                     <IconButton onClick={() => deleteBLockHandler(blockId)}  aria-label="delete" color="primary" sx={{marginLeft: 'auto'}}>
                         <DeleteIcon/>
                     </IconButton>
                 </Grid>
             </Grid>
             <Grid display='flex'>
                 {cards.map(card =>(
                     <Grid key={card.id} sx={{ maxWidth: 345, backgroundColor: '#ccc', margin: 2 }}>
                         <CardContent>
                             <Typography gutterBottom variant="h6" component="div">
                                 Заголовок:  {card.cardTitle}
                             </Typography>
                             <Typography variant="body1" >
                                 Текст: {card.cardText}
                             </Typography>
                             <Typography variant="body2" color="text.secondary"> Ссылка: {card.buttonUrl}</Typography>
                         </CardContent>
                     </Grid>
                 ))}
             </Grid>
         </Paper>
        </>
    );
};

export default BlockItem;