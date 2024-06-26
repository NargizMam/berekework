import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import MediaCard, { MediaCardApiData } from './MediaCard/MediaCard';
import MediaBlockStyle from './MediaBlock-style';
import arrowLeft from '../../../../shared/assets/arrow-left.png';
import arrowRight from '../../../../shared/assets/arrow-right.png';
import './SwiperNavigation.css';

export interface MediaBlockApiData {
  primary: {
    title: Array<{
      type: string;
      text: string;
    }>;
  };
  items: MediaCardApiData[];
}

interface Props {
  slice: MediaBlockApiData;
}

export const VideoBlock: React.FC<Props> = ({ slice }) => {

  if (!slice.items || slice.items.length === 0) {
    return (
      <Typography variant="h4" sx={MediaBlockStyle.subtitleNoCards}>
        Нет медиа файлов для отображения
      </Typography>
    );
  }

  const showNavigation = slice.items.length > 2;

  return (
    <Box sx={MediaBlockStyle.videoContainer}>
      <Box sx={MediaBlockStyle.row}>
        {slice.primary.title.map((title, index) => (
          <Typography id='video' key={index} variant="h4" sx={MediaBlockStyle.title}>
            {title.text}
          </Typography>
        ))}
        {showNavigation && (
          <Box sx={MediaBlockStyle.paginationControls}>
            <button className="swiper-video-button-prev">
              <img src={arrowLeft} alt="arrow-left" />
            </button>
            <button className="swiper-video-button-next">
              <img src={arrowRight} alt="arrow-right" />
            </button>
          </Box>
        )}
      </Box>
      <Box sx={MediaBlockStyle.cards}>
        {slice.items.length === 1 ? (
          <MediaCard
            index={0}
            video={slice.items[0].video}
            mediaCardsLength={slice.items.length}
          />
        ) : (
          <Swiper
            slidesPerView={1.2}
            spaceBetween={10}
            navigation={{
              nextEl: `.swiper-video-button-next`,
              prevEl: `.swiper-video-button-prev`,
            }}
            watchOverflow={true}
            breakpoints={{
              600: { slidesPerView: 2, spaceBetween: 10 },
              900: { slidesPerView: slice.items.length < 3 ? slice.items.length : 3, spaceBetween: 10 },
            }}
            modules={[Navigation]}
          >
            {slice.items.map((item, index) => (
              <SwiperSlide key={index}>
                <MediaCard
                  index={index}
                  video={item.video}
                  mediaCardsLength={slice.items.length}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};
