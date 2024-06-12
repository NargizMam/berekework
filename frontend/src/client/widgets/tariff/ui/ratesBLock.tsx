import React, { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './ratesBlock.css';
import RatesCard from './ratesCard';

interface Tariff {
  items: {
    tariffdescription: { text: string }[];
    tarifftitle: string;
    tarriflink: {
      target: string;
      url: string;
    };
  }[];
}

interface Props {
  slice: Tariff;
}

export const RatesBLock: React.FC<Props> = ({ slice }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxSteps, setMaxSteps] = useState<number>(0);
  const [cardsOnPage, setCardOnPage] = useState<number>(0);

  useEffect(() => {
    if (slice.items.length > 0) {
      if (window.innerWidth < 770) {
        setMaxSteps(slice.items.length);
        setCardOnPage(1);
      } else if (window.innerWidth < 1300) {
        setMaxSteps(slice.items.length / 2);
        setCardOnPage(2);
      } else {
        setMaxSteps(slice.items.length / 3);
        setCardOnPage(3);
      }
    }
  }, [slice.items.length]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const hasNextCards = activeStep < maxSteps - 1;
  const hasPreviousCards = activeStep > 0;

  if (slice.items.length === 0) {
    return <div>Нет доступных тарифов.</div>;
  }

  return (
    <>
      <div className="titlePart">
        <h2 id='tariff' className="rateBlockTitle">Тарифы</h2>
        <div className="titleButtons">
          <button className="titleButton" onClick={handleBack} disabled={!hasPreviousCards}>
            <NavigateBeforeIcon sx={{ fontSize: 24 }} />
          </button>
          <button className="titleButton" onClick={handleNext} disabled={!hasNextCards}>
            <NavigateNextIcon sx={{ fontSize: 24 }} />
          </button>
        </div>
      </div>
      {slice.items.length > 0 ? (
        <div className="rateBlock">
          {slice.items.slice(activeStep * cardsOnPage, (activeStep + 1) * cardsOnPage).map((tariff, index) => (
            <RatesCard
              key={`${index} + ${tariff.tarifftitle}`}
              title={tariff.tarifftitle}
              description={tariff.tariffdescription}
              link={tariff.tarriflink}
            />
          ))}
        </div>
      ) : (
        <div>Нет доступных тарифов.</div>
      )}
    </>
  );
};
