import React, {useEffect, useState} from "react";
import CheckIcon from '@mui/icons-material/Check';
import CallMadeIcon from '@mui/icons-material/CallMade';
import './ratesCard.css'
import {Grid} from "@mui/material";

interface Props {
    title: string,
    description: string[],
    url: string
}

const RatesCard: React.FC<Props> = ({title, description, url}) => {
    const [cardLink, setCardLink] = useState<boolean>(false);

    useEffect(() => {
        if (window.innerWidth < 700) {
            setCardLink(true);
        } else {
            setCardLink(false);
        }
    }, []);

    return (
        <Grid className='rateCard' component={cardLink ? 'a' : 'div'} href={cardLink ? url : undefined}>
            <p className='rateCardTitle'>{title}</p>
            {description.map(desc => (
                <div className='rateCardTextBlock'>
                    <CheckIcon sx={{width: '20px', height: '20px', marginRight: '20px'}}/>
                    <p className='rateCardText'>{desc}</p>
                </div>
            ))}
            {!cardLink &&
                <div className='cardButton'>
                    <p className='cardBtnText'>Смотреть</p>
                    <a className='cardLink' href={url}><CallMadeIcon fontSize='large' className='northEastIcon'/></a>
                </div>
            }

        </Grid>
    );
};

export default RatesCard;