import React, { useRef, useState } from 'react';
import './SliderCarouselStyles.css';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
// в работе

interface MoviesProps {
  movies: MovieType[];
}

const SliderCarousel = ({ movies }: MoviesProps) => {
  return (
    <div className="carousel">
      {movies.map((movie, index) => (
        <a key={movie.imdbID}>
          <img alt="" src={movie.Poster} className="image" />
        </a>
      ))}
    </div>
  );
};

export default SliderCarousel;
