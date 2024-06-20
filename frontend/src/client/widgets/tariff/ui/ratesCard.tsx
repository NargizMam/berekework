import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CallMadeIcon from '@mui/icons-material/CallMade';
import './ratesCard.css';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectTariff } from '../api/tariffThunk';
import { selectEmployer } from '../../../page/Auth/model/AuthSlice';
import { toast } from 'react-toastify';

interface Props {
  title: string;
  description: { text: string }[];
  link: {
    target: string;
    url: string;
  };
}

const RatesCard: React.FC<Props> = ({ title, description }) => {
  const [cardLink, setCardLink] = useState<boolean>(false);
  const employer = useAppSelector(selectEmployer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.innerWidth < 770) {
      setCardLink(true);
    } else {
      setCardLink(false);
    }
  }, []);

  const handleSelectTariff = async (tariff: string) => {
    try {
      await dispatch(selectTariff({ email: employer?.email || '', typeTariff: tariff }));
      toast.success('Админу отправлено письмо!');
    } catch (error) {
      toast.success('Письмо не отправлено!');
    }
  };

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
        <div onClick={() => handleSelectTariff(title)} className="cardButton">
          <p className="cardBtnText">Смотреть</p>
          <div className="cardBtnIcon">
            <CallMadeIcon sx={{ color: '#000' }} />
          </div>
        </div>
      )}
    </Box>
  );
};

export default RatesCard;
