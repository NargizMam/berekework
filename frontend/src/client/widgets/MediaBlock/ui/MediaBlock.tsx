import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import MediaCard, { MediaCardApiData } from './MediaCard/MediaCard';
import MediaBlockStyle from './MediaBlock-style';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

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
  const swiperRef = useRef<any>(null);

  return (
    <Box sx={{ ...MediaBlockStyle.container, ...style }}>
      <Box sx={MediaBlockStyle.row}>
        {slice.primary.title.map((title, index) => (
          <Typography key={index} variant="h4" sx={MediaBlockStyle.title}>
            {title.text}
          </Typography>
        ))}
        <Box sx={MediaBlockStyle.paginationControls}>
          <button
            style={MediaBlockStyle.swiperButton}
            className={`swiper-button-prev-${className}`}
            onClick={() => swiperRef.current.swiper.slidePrev()}
            disabled={false}
          >
            <ArrowBackIos sx={arrowIconStyle} />
          </button>
          <button
            style={MediaBlockStyle.swiperButton}
            className={`swiper-button-next-${className}`}
            onClick={() => swiperRef.current.swiper.slideNext()}
            disabled={false}
          >
            <ArrowForwardIos sx={arrowIconStyle} />
          </button>
        </Box>
      </Box>
      <Box sx={MediaBlockStyle.cards}>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: `.swiper-button-prev-${className}`,
            nextEl: `.swiper-button-next-${className}`,
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
              <MediaCard image={item.image} video={item.video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MediaBlock;
