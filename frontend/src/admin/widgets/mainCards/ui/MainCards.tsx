import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainCardItem, { MainCardApiData } from './MainCardItem';
import 'swiper/css';
import 'swiper/css/pagination';
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
      {items.length === 1 ? (
        <MainCardItem
          title={items[0].title}
          description={items[0].description}
          image={items[0].image}
          link={items[0].link}
          icon={items[0].icon}
        />
      ) : (
        <Swiper
          className="MainCards__Swiper"
          spaceBetween={10}
          slidesPerView={1.2}
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
      )}
    </div>
  );
};
