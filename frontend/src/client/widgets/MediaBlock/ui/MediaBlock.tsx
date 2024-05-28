import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import MediaCard, { MediaCardApiData } from './MediaCard/MediaCard';
import MediaBlockStyle from './MediaBlock-style';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import FsLightbox from 'fslightbox-react';

const arrowIconStyle = {
  fontSize: '20px',
};

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
  style?: React.CSSProperties;
  className: string;
}

const MediaBlock: React.FC<Props> = ({ slice, style, className }) => {
  const [toggler, setToggler] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    console.log('index = ', index);
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

  const isVideoBlock = className === 'video';

  const sources = slice.items
    .map((item) => (isVideoBlock ? item.video?.url : item.image?.url))
    .filter((url): url is string => Boolean(url));

  return (
    <Box sx={{ ...MediaBlockStyle.container, ...style }}>
      <Box sx={MediaBlockStyle.row}>
        {slice.primary.title.map((title, index) => (
          <Typography key={index} variant="h4" sx={MediaBlockStyle.title}>
            {title.text}
          </Typography>
        ))}
        <Box sx={MediaBlockStyle.paginationControls}>
          <button style={MediaBlockStyle.swiperButton} className={`swiper-button-prev-${className}`}>
            <ArrowBackIos sx={arrowIconStyle} />
          </button>
          <button style={MediaBlockStyle.swiperButton} className={`swiper-button-next-${className}`}>
            <ArrowForwardIos sx={arrowIconStyle} />
          </button>
        </Box>
      </Box>
      <Box sx={MediaBlockStyle.cards}>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: `.swiper-button-next-${className}`,
            prevEl: `.swiper-button-prev-${className}`,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {slice.items.map((item, index) => (
            <SwiperSlide key={index} className="media-slide">
              <MediaCard image={item.image} video={item.video} onClick={() => openLightbox(index)} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        <FsLightbox toggler={toggler} sources={sources} slide={currentIndex + 1} />
      </Box>
    </Box>
  );
};

export default MediaBlock;
