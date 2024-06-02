import React from 'react';
import OurValuesCard from './ourValuesCard';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import OurValuesBlockStyle from './ourValuesBlock-style';

interface OurValues {
  items: {
    title: string;
    text: string;
    icon: {
      alt: string;
      url: string;
    };
  }[];
}

interface Props {
  slice: OurValues;
}

const OurValuesBlock: React.FC<Props> = ({ slice }) => {
  const slidesPerView = slice.items.length < 3 ? slice.items.length : 3;

  return (
    <Box sx={OurValuesBlockStyle}>
      <Typography variant="h4" sx={OurValuesBlockStyle.ourValuesBlockTitle}>
        Наши ценности
      </Typography>
      <Box sx={OurValuesBlockStyle.ourValuesCardBlock}>
        {slice.items.length === 1 ? (
          <OurValuesCard title={slice.items[0].title} text={slice.items[0].text} icon={slice.items[0].icon} />
        ) : (
          <Swiper
            className="OurValuesSwiper"
            spaceBetween={10}
            slidesPerView={1.2}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              900: {
                slidesPerView: slidesPerView,
                spaceBetween: 10,
              },
            }}
            modules={[Pagination]}
          >
            {slice.items.map((item, index) => (
              <SwiperSlide key={index} style={OurValuesBlockStyle.OurValuesSwiperSlide}>
                <Box sx={OurValuesBlockStyle.ourValuesCard}>
                  <Box sx={OurValuesBlockStyle.ourValuesImgFrame}>
                    <img src={item.icon.url} alt={item.icon.alt} />
                  </Box>
                  <Typography variant="h5" sx={OurValuesBlockStyle.ourValuesCardTitle}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={OurValuesBlockStyle.ourValuesCardText}>
                    {item.text}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

export default OurValuesBlock;
