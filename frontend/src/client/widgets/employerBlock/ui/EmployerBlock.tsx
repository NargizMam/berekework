import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Box, Typography } from '@mui/material';
import EmployerCard from '../../../feachers/employerCard/ui/EmployerCard';
import arrowLeft from '../../../../shared/assets/arrow-left.png';
import arrowRight from '../../../../shared/assets/arrow-right.png';
import EmployerBlockStyle from './EmployerBlock-style';
import './SwiperNavigationEmployerBlock.css';
import 'swiper/css';

export interface EmployerBlockApiData {
  primary: {
    empltitle: {
      text: string
    }[];
  };
  items: {
    emplinfo: {
      type: string;
      text: string
    }[];
    image: {
      url: string
    };
    id: string;
  }[];
}

interface Props {
  slice: EmployerBlockApiData;
}

export const EmployerBlock: React.FC<Props> = ({ slice }) => {
  const showNavigation = slice.items.length > 5;

  return (
    <Box sx={EmployerBlockStyle.container}>
      <Box sx={EmployerBlockStyle.row}>
        <Typography
          id='our-staff'
          variant='h3'
          sx={{
            fontWeight: 'bold',
            color: '#000',
            lineHeight: '1.3',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.875rem',
            },
          }}>
          {slice?.primary.empltitle[0].text}
        </Typography>
        {showNavigation && (
          <Box sx={EmployerBlockStyle.paginationControls}>
            <button className={`swiper-employer-block-button-prev`}>
              <img src={arrowLeft} alt='arrow-left' />
            </button>
            <button className={`swiper-employer-block-button-next`}>
              <img src={arrowRight} alt='arrow-right' />
            </button>
          </Box>
        )}
      </Box>
      <Box>
        {slice.items.length === 1 ? (
          <EmployerCard
            key={slice.items[0].id}
            data={slice.items[0]}
          />
        ) : (
          <Swiper
            className='swiper-employer-container'
            spaceBetween={10}
            slidesPerView={1.4}
            navigation={{
              nextEl: `.swiper-employer-block-button-next`,
              prevEl: `.swiper-employer-block-button-prev`,
            }}
            breakpoints={{
              400: {
                slidesPerView: 2.4,
                spaceBetween: 10,
              },
              600: {
                slidesPerView: 3.4,
                spaceBetween: 20,
              },
              900: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation]}
          >
            {slice.items.map((employer, index) => (
              <SwiperSlide key={index}>
                <EmployerCard
                  data={employer}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

