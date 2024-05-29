import React from 'react';
import { Box } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import './LastNews.css';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';


interface Props {
  uid: string | null;
}

export const LastNewsCards: React.FC<Props> = ({uid}) => {
  const safeUid = uid || '';

  const [document] = usePrismicDocumentByUID('lastnews', safeUid);

  const title = prismicH.asText(document?.data.title);
  const date = document?.data.date;
  const formattedDate = dayjs(date).format('DD.MM');
  const formattedTime = dayjs(date).format('HH:mm');

  return (
    <>
      <Box className="newsCard">
        {document ?
          <>
            <p className="newsCardTitle">{title}</p>
            <div className="rateCardTextBlocks">
              <div className="rateCardTextBlock">
                <p className="newsCardText">{document?.data.preview}</p>
              </div>
            </div>
            <div className="lastNewsDateTimeLink">
              <p className="cardDateText"><strong>Дата: </strong>{formattedDate}</p>
              <p className="cardDateText"><strong>Время:</strong> {formattedTime}</p>
              <NavLink className="cardBtnLink" to={`news/${uid}`}><ArrowOutwardIcon/></NavLink>
            </div>
          </>
          :
          <div>Loading...</div>
        }
      </Box>
    </>
  )
    ;
};

export default LastNewsCards;
