import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import LastNewsBlockStyle from './LastNewsBlock-style';
import LastNewsCards from './LastNewsCards/LastNewsCards';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAllPrismicDocumentsByType } from '@prismicio/react';

const LastNewsBlock = () => {
  const [pages] = useAllPrismicDocumentsByType('lastnews');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxSteps, setMaxSteps] = useState<number>(2);
  const [cardsOnPage, setCardOnPage] = useState<number>(3);

  useEffect(() => {
    if (pages) {
      if (window.innerWidth < 700) {
        setMaxSteps(pages.length);
        setCardOnPage(1);
      } else if (window.innerWidth < 1300) {
        setMaxSteps(pages.length / 2);
        setCardOnPage(2);
      } else {
        setMaxSteps(pages.length / 3);
        setCardOnPage(3);
      }
    }
  }, [pages]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const hasNextCards = activeStep < maxSteps - 1;
  const hasPreviousCards = activeStep > 0;

  return (
    <>
      <Box sx={LastNewsBlockStyle.block} style={{ marginTop: '30px' }}>
        <Box sx={LastNewsBlockStyle.row}>
          <Typography variant="h2" sx={LastNewsBlockStyle.title}>
            Последние новости
          </Typography>
          <div className="lastNewsButtons">
            <button className="titleButton" onClick={handleBack} disabled={!hasPreviousCards}>
              <NavigateBeforeIcon sx={{ fontSize: 24 }} />
            </button>
            <button className="titleButton" onClick={handleNext} disabled={!hasNextCards}>
              <NavigateNextIcon sx={{ fontSize: 24 }} />
            </button>
          </div>
        </Box>
        <div className="rateBlock">
          {pages
            ?.slice(activeStep * cardsOnPage, (activeStep + 1) * cardsOnPage)
            .map((news) => <LastNewsCards key={news.id} uid={news.uid} />)}
        </div>
        {!pages && <div>Нет доступных новостей.</div>}
      </Box>
    </>
  );
};

export default LastNewsBlock;
