import React from 'react';
import OurValuesCard from './ourValuesCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import './ourValues.css';

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

export const OurValuesBlock: React.FC<Props> = ({ slice }) => {
  const slidesPerView = slice.items.length < 3 ? slice.items.length : 3;

  return (
    <div>
      <p className="ourValuesBlockTitle">Наши ценности</p>
      <div className="ourValuesCardBlock">
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
              <SwiperSlide className="OurValuesSwiperSlide" key={index}>
                <OurValuesCard title={item.title} text={item.text} icon={item.icon} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};
