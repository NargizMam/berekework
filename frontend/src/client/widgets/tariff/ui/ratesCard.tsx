import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
// import CallMadeIcon from '@mui/icons-material/CallMade';
import './ratesCard.css';
import { Box } from '@mui/material';

interface Props {
  title: string;
  description: { text: string }[];
  link: {
    target: string;
    url: string;
  };
}

const RatesCard: React.FC<Props> = ({ title, description, link }) => {
  const [cardLink, setCardLink] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 700) {
      setCardLink(true);
    } else {
      setCardLink(false);
    }
  }, []);
  // <Grid className='rateCard' component={cardLink ? 'a' : 'div'} href={cardLink ? url : undefined}>
  return (
    <Box className="rateCard">
      <p className="rateCardTitle">{title}</p>
      <div className="rateCardTextBlocks">
        {description.map((desc) => (
          <div className="rateCardTextBlock">
            <CheckIcon sx={{ width: '20px', height: '20px', marginRight: '20px' }} />
            <p className="rateCardText">{desc.text}</p>
          </div>
        ))}
      </div>
      {!cardLink && (
        <a target={link.target} href={link.url}>
          <div className="cardButton">
            <p className="cardBtnText">Смотреть</p>
          </div>
        </a>
      )}
    </Box>
  );
};

export default RatesCard;
