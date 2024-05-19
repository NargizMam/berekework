import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './ratesBlock.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { getAllTariff } from '../../../../admin/page/tariffPanel/api/tariffThunk';
import { selectTariffs, selectTariffsLoading } from '../../../../admin/page/tariffPanel/model/tariffSlice';
import RatesCard from './ratesCard';
import { Loader } from '../../../../shared/loader';

const RatesBLock = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTariffs);
  const loading = useAppSelector(selectTariffsLoading);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxSteps, setMaxSteps] = useState<number>(0);
  const [cardsOnPage, setCardOnPage] = useState<number>(0);

  useEffect(() => {
    dispatch(getAllTariff());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      if (window.innerWidth < 700) {
        setMaxSteps(data[0].tariffs.length);
        setCardOnPage(1);
      } else if (window.innerWidth < 1300) {
        setMaxSteps(data[0].tariffs.length / 2);
        setCardOnPage(2);
      } else {
        setMaxSteps(data[0].tariffs.length / 3);
        setCardOnPage(3);
      }
    }
  }, [data]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const hasNextCards = activeStep < maxSteps - 1;
  const hasPreviousCards = activeStep > 0;

  if (loading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <div>Нет доступных тарифов.</div>;
  }

  const blockData = data[0];

  return (
    <div>
      <div className="titlePart">
        <h2 className="rateBlockTitle">{blockData.mainTitle}</h2>
        <div className="titleButtons">
          <button className="titleButton" onClick={handleBack} disabled={!hasPreviousCards}>
            <NavigateBeforeIcon sx={{ fontSize: 24 }} />
          </button>
          <button className="titleButton" onClick={handleNext} disabled={!hasNextCards}>
            <NavigateNextIcon sx={{ fontSize: 24 }} />
          </button>
        </div>
      </div>
      {blockData.tariffs.length > 0 ? (
        <div className="rateBlock">
          {blockData.tariffs.slice(activeStep * cardsOnPage, (activeStep + 1) * cardsOnPage).map((data) => (
            <RatesCard
              key={data._id}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
      ) : (
        <div>Нет доступных тарифов.</div>
      )}
    </div>
  );
};

export default RatesBLock;
