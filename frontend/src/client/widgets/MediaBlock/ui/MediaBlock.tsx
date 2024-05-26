import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MediaCard, { MediaCardApiData } from './MediaCard/MediaCard';
import MediaBlockStyle from './MediaBlock-style';

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
}

const MediaBlock: React.FC<Props> = ({ slice, style }) => {
  return (
    <Box sx={{ ...MediaBlockStyle.container, ...style }}>
      <Box sx={MediaBlockStyle.row}>
        {slice.primary.title.map((title, index) => (
          <Typography key={index} variant="h4" sx={MediaBlockStyle.title}>
            {title.text}
          </Typography>
        ))}
      </Box>
      <Box sx={MediaBlockStyle.cards}>
        {slice.items.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1.3}
            breakpoints={{
              600: {
                slidesPerView: 3.3,
                spaceBetween: 10,
              },
            }}
          >
            {slice.items.map((item, index) => (
              <SwiperSlide style={{ minWidth: '272px', height: 'auto' }} key={index} className="media-slide">
                <MediaCard image={item.image} video={item.video} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography variant="h6" sx={MediaBlockStyle.paragraph}>
            Медиафайлы отсутствуют
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MediaBlock;
