import { Box, Typography } from '@mui/material';
import LastNewsBlockStyle from './LastNewsBlock-style';
import LastNewsCards from './LastNewsCards/LastNewsCards';
import { useAllPrismicDocumentsByType } from '@prismicio/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import arrowLeft from '../../../../shared/assets/arrow-left.png';
import arrowRight from '../../../../shared/assets/arrow-right.png';
import 'swiper/css';
import './SwiperLastNewsNavigation.css';
import React from 'react';

export interface LastNewsBlockTitle {
  primary: {
    lastnewsblock: string;
  }
}

interface Props {
  slice: LastNewsBlockTitle
}

export const LastNewsBlock: React.FC<Props> = ({slice}) => {
  const [pages] = useAllPrismicDocumentsByType('lastnews');

  if (!pages || pages.length === 0) {
    return (
      <Typography variant="h4" sx={LastNewsBlockStyle.subtitleNoCards}>
        {slice.primary.lastnewsblock}
      </Typography>
    );
  }

  const showNavigation = pages.length > 2;

  return (
    <>
      <Box sx={LastNewsBlockStyle.block} style={{ marginTop: '30px' }}>
        <Box sx={LastNewsBlockStyle.row}>
          <Typography id="news" variant="h2" sx={LastNewsBlockStyle.title}>
            Последние новости
          </Typography>
          {showNavigation && (
            <Box sx={LastNewsBlockStyle.paginationControls}>
              <button className={`swiper-last-news-button-prev`}>
                <img src={arrowLeft} alt="arrow-left" />
              </button>
              <button className={`swiper-last-news-button-next`}>
                <img src={arrowRight} alt="arrow-right" />
              </button>
            </Box>
          )}
        </Box>
        <Box sx={LastNewsBlockStyle.cards}>
          {pages.length === 1 ? (
            <LastNewsCards key={pages[0].id} uid={pages[0].uid} />
          ) : (
            <Swiper
              slidesPerView={1.2}
              spaceBetween={10}
              navigation={{
                nextEl: `.swiper-last-news-button-next`,
                prevEl: `.swiper-last-news-button-prev`,
              }}
              watchOverflow={true}
              breakpoints={{
                600: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                900: {
                  slidesPerView: pages.length < 3 ? pages.length : 3,
                  spaceBetween: 10,
                },
              }}
              modules={[Navigation]}
              className="swiper-last-news"
            >
              {pages.map((news) => (
                <SwiperSlide key={news.id}>
                  <LastNewsCards key={news.id} uid={news.uid} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>
      </Box>
    </>
  );
};
