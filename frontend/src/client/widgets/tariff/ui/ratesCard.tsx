import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CallMadeIcon from '@mui/icons-material/CallMade';
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
    if (window.innerWidth < 770) {
      setCardLink(true);
    } else {
      setCardLink(false);
    }
  }, []);

  return (
    <Box className="rateCard">
      <p className="rateCardTitle">{title}</p>
      <div className="rateCardTextBlocks">
        {description.map((desc, index) => (
          <div className="rateCardTextBlock" key={index + 'rateCard'}>
            <CheckIcon sx={{ width: '20px', height: '20px', marginRight: '20px' }} />
            <p className="rateCardText">{desc.text}</p>
          </div>
        ))}
      </div>
      {!cardLink && (
        <a target={link.target} href={link.url}>
          <div className="cardButton">
            <p className="cardBtnText">Смотреть</p>
            <div className="cardBtnIcon">
              <CallMadeIcon sx={{ color: '#000' }} />
            </div>
          </div>
        </a>
      )}
    </Box>
  );
};

export default RatesCard;
