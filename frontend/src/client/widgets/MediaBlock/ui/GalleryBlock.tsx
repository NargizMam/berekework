import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import MediaCard, { MediaCardApiData } from './MediaCard/MediaCard';
import MediaBlockStyle from './MediaBlock-style';
import FsLightbox from 'fslightbox-react';
import arrowLeft from '../images/arrow-left.png';
import arrowRight from '../images/arrow-right.png';
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

export const GalleryBlock: React.FC<Props> = ({ slice }) => {
  const [toggler, setToggler] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setToggler(!toggler);
  };

  if (!slice.items || slice.items.length === 0) {
    return (
      <Typography variant="h4" sx={MediaBlockStyle.subtitleNoCards}>
        Нет медиа файлов для отображения
      </Typography>
    );
  }

  const showNavigation = slice.items.length > 3;

  const sources = slice.items.map((item) => item.image?.url).filter((url): url is string => Boolean(url));

  return (
    <Box sx={{ ...MediaBlockStyle.container }}>
      <Box sx={MediaBlockStyle.row}>
        {slice.primary.title.map((title, index) => (
          <Typography key={index} variant="h4" sx={MediaBlockStyle.title}>
            {title.text}
          </Typography>
        ))}
        {showNavigation && (
          <Box sx={MediaBlockStyle.paginationControls}>
            <button className={`swiper-gallery-button-prev`}>
              <img src={arrowLeft} alt="arrow-left" />
            </button>
            <button className={`swiper-gallery-button-next`}>
              <img src={arrowRight} alt="arrow-right" />
            </button>
          </Box>
        )}
      </Box>
      <Box sx={MediaBlockStyle.cards}>
        {slice.items.length === 1 ? (
          <MediaCard
            index={0}
            image={slice.items[0].image}
            onClick={() => openLightbox(0)}
            mediaCardsLength={slice.items.length}
          />
        ) : (
          <Swiper
            slidesPerView={1.2}
            spaceBetween={10}
            navigation={{
              nextEl: `.swiper-gallery-button-next`,
              prevEl: `.swiper-gallery-button-prev`,
            }}
            watchOverflow={true}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              900: {
                slidesPerView: slice.items.length < 3 ? slice.items.length : 3,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {slice.items.map((item, index) => (
              <SwiperSlide key={index}>
                <MediaCard
                  index={index}
                  image={item.image}
                  mediaCardsLength={slice.items.length}
                  onClick={() => openLightbox(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <FsLightbox toggler={toggler} sources={sources} slide={currentIndex + 1} />
      </Box>
    </Box>
  );
};