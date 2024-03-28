import React, { useRef, useState } from 'react';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './SliderSwiperStyles.css';

interface MoviesProps {
  movies: MovieType[];
}

export const SliderSwiper = ({ movies }: MoviesProps) => {
  return (
    <div className="carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={-50}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        speed={800}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        observer={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.imdbID}>
            <a>
              <img alt="img" src={movie.Poster} className="image" />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
