import { usePrismicDocumentByUID } from '@prismicio/react';
import { useParams } from 'react-router-dom';
import * as prismicH from '@prismicio/helpers';
import dayjs from 'dayjs';
import '../LastNewsCards/LastNews.css';
import '../LastNewsBlock';
import LastNewsBlockStyle from '../LastNewsBlock-style';
import { Container, Grid, Typography } from '@mui/material';

const NewsPage = () => {
  const {uid} = useParams();
  const safeUid = uid || '';
  const [document] = usePrismicDocumentByUID('lastnews', safeUid);

  const description = prismicH.asText(document?.data.body[0].primary.description);
  const title = prismicH.asText(document?.data.title);
  const date = document?.data.date;
  const formattedDate = dayjs(date).format('DD.MM  HH:mm');

  return (
    <Container>
      <div style={{marginTop: '40px', marginBottom: '100px'}}>
        <Typography className='newsPageTitle' variant="h2" sx={LastNewsBlockStyle.title}>{title}</Typography>
        <Grid xs={4}>
          <p className="newsPageText"> {description}</p>
        </Grid>
        <div>
          <p className="cardDateText"><strong>Дата: </strong>{formattedDate}</p>
        </div>
      </div>
    </Container>
  );
};

export default NewsPage;