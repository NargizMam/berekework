import React from 'react';
import OurValuesCard from './ourValuesCard';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import OurValuesBlockStyle from './ourValuesBlock-style';
import 'swiper/css/pagination';
import './ourValuesPagination.css';

interface OurValues {
  primary: {
    valuestitle: Array<{
      text: string;
    }>;
  };
  items: {
    cardtitle: Array<{
      text: string;
      type: string;
    }>;
    icon: {
      alt: string;
      url: string;
    };
  }[];
}

interface Props {
  slice: OurValues;
}

export const OurValuesBlock: React.FC<Props> = ({ slice }) => {
  const slidesPerView = slice.items.length < 3 ? slice.items.length : 3;

  return (
    <Box sx={OurValuesBlockStyle}>
      <Typography id='our-values' variant="h4" sx={OurValuesBlockStyle.ourValuesBlockTitle}>
        {slice.primary.valuestitle[0].text}
      </Typography>
      <Box sx={OurValuesBlockStyle.ourValuesCardBlock}>
        {slice.items.length === 1 ? (
          <OurValuesCard
            title={slice.items[0].cardtitle[0].text}
            text={slice.items[0].cardtitle[1].text}
            icon={slice.items[0].icon}
          />
        ) : (
          <Swiper
            className="OurValuesSwiper"
            spaceBetween={10}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
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
                <Box id='our-advantages' sx={OurValuesBlockStyle.ourValuesCard}>
                  <Box sx={OurValuesBlockStyle.ourValuesImgFrame}>
                    <img src={item.icon.url} alt={item.icon.alt} />
                  </Box>
                  <Box sx={OurValuesBlockStyle.content}>
                    <Typography variant="h5" sx={OurValuesBlockStyle.ourValuesCardTitle}>
                      {item.cardtitle[0].text}
                    </Typography>
                    <Typography variant="body1" sx={OurValuesBlockStyle.ourValuesCardText}>
                      {item.cardtitle[1].text}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};
