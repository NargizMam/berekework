import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MainCardItem, { MainCardApiData } from './MainCardItem';
import './MainCards.css';

interface MainCardsApiData {
  items: MainCardApiData[];
}

interface Props {
  slice: MainCardsApiData;
}

export const MainCards: React.FC<Props> = ({ slice }) => {
  const { items } = slice;

  return (
    <div className="Main-cards__container">
      <Swiper
        className="MainCards__Swiper"
        spaceBetween={10}
        slidesPerView={1.3} // По умолчанию показывать одну карточку
        onSlideChange={() => console.log('Слайд изменен')}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
      >
        {items.map((mainCard, index) => (
          <SwiperSlide className="MainCards__SwiperSlide" key={index}>
            <MainCardItem
              title={mainCard.title}
              description={mainCard.description}
              image={mainCard.image}
              link={mainCard.link}
              icon={mainCard.icon}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
