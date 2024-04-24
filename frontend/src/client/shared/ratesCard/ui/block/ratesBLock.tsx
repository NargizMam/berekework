
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './ratesBlock.css'
import {useEffect, useState} from "react";
import { RateCardData } from '../../data.ts';
import RatesCard from '../card/ratesCard.tsx';


const RatesBLock = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [maxSteps, setMaxSteps] = useState<number>(0);
    const [cardsOnPage,setCardOnPage] = useState<number>(0);

    useEffect(() => {
        if (window.innerWidth < 700) {
            setMaxSteps(RateCardData[0].cards.length)
            setCardOnPage( 1);
        } else if (window.innerWidth < 1300) {
            setMaxSteps(RateCardData[0].cards.length / 2)
            setCardOnPage( 2);
        } else {
            setMaxSteps(RateCardData[0].cards.length / 3)
            setCardOnPage( 3);
        }
    }, []);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const hasNextCards = activeStep < maxSteps - 1;
    const hasPreviousCards = activeStep > 0;

    return (
        <div>
            <div className='titlePart'>
                <h2 className='rateBlockTitle'>{RateCardData[0].title}</h2>
                <div className='titleButtons'>
                    <button className='titleButton' onClick={handleBack} disabled={!hasPreviousCards}><NavigateBeforeIcon sx={{fontSize: 24}}/>
                    </button>
                    <button className='titleButton' onClick={handleNext} disabled={!hasNextCards}><NavigateNextIcon sx={{fontSize: 24}}/>
                    </button>
                </div>
            </div>
            <div className='rateBlock'>
                {RateCardData[0].cards.slice(activeStep * cardsOnPage, (activeStep + 1) * cardsOnPage).map((data) => (
                    <RatesCard
                        key={data._id}
                        title={data.title}
                        description={data.description}
                        url={data.url}
                    />
                ))}
            </div>
        </div>
    );
};

export default RatesBLock;