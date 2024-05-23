import React, { useEffect, useState } from 'react';
import { Box, Typography} from '@mui/material';
import LastNewsBlockStyle from './LastNewsBlock-style';
// import { PaginationCards } from '../../../../admin/widgets/PaginationCards';
import LastNewsCards from './LastNewsCards/LastNewsCards';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import RatesCard from '../../tariff/ui/ratesCard';

interface LastNewsBlock {
  items: {
    lastnewsdatetime: string;
    lastnewsdesc: string;
    lastnewslink: {
      target: string;
      url: string;
    };
    lastnewstitle: string;
  }[];
}
interface Props {
  slice: LastNewsBlock;
}

const LastNewsBlock: React.FC<Props> = ({slice}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxSteps, setMaxSteps] = useState<number>(0);
  const [cardsOnPage, setCardOnPage] = useState<number>(0);

  useEffect(() => {
    if (slice.items.length > 0) {
      if (window.innerWidth < 700) {
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
      <Box sx={LastNewsBlockStyle.block} style={{marginTop: '30px'}}>
        <Box sx={LastNewsBlockStyle.row}>
          <Typography variant="h2" sx={LastNewsBlockStyle.title}>
            Последние новости
          </Typography>
          <div className="lastNewsButtons">
            <button className="titleButton" onClick={handleBack} disabled={!hasPreviousCards}>
              <NavigateBeforeIcon sx={{fontSize: 24}}/>
            </button>
            <button className="titleButton" onClick={handleNext} disabled={!hasNextCards}>
              <NavigateNextIcon sx={{fontSize: 24}}/>
            </button>
          </div>
        </Box>
        {slice.items.length > 0 ? (
          <div className="rateBlock">
            {slice.items.slice(activeStep * cardsOnPage, (activeStep + 1) * cardsOnPage).map((news, index) => (
              <LastNewsCards key={index} title={news.lastnewstitle} description={news.lastnewsdesc} date={news.lastnewsdatetime} link={news.lastnewslink} />
            ))}
          </div>
        ) : (
          <div>Нет доступных новостей.</div>
        )}
      </Box>
    </>
  );
};

export default LastNewsBlock;
