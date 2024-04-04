<<<<<<< HEAD
import React, { memo } from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> develop
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SliderSwiperStyles.css';
import { Modal } from '../Modal/Modal';

<<<<<<< HEAD
type SliderSwiperProps = {
=======
interface SliderSwiperProps {
>>>>>>> develop
  movies: MovieType[];
  activeMovie: MovieType;
  onMovieClick: (movie: MovieType) => void;
  isModalOpen: boolean;
  handleModalClose: () => void;
<<<<<<< HEAD
};

const SliderSwiper = ({
=======
}

export const SliderSwiper = ({
>>>>>>> develop
  movies,
  activeMovie,
  onMovieClick,
  isModalOpen,
  handleModalClose,
}: SliderSwiperProps) => {
  return (
    <div className="slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={'auto'}
        slidesPerGroup={1}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        observer={true}
<<<<<<< HEAD
=======
        // loop={true}
>>>>>>> develop
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.imdbID}>
            <a>
              <img
<<<<<<< HEAD
                alt="poster"
=======
                alt="img"
>>>>>>> develop
                src={movie.Poster}
                className="image"
                onClick={() => onMovieClick(movie)}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal visible={isModalOpen} setVisible={handleModalClose}>
        <div>
          <div>
            <img alt="img" src={activeMovie.Poster} className="image" />
          </div>
          <div>
            <p>Название: {activeMovie.Title}</p>
            <p>Год создания: {activeMovie.Year}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
<<<<<<< HEAD

export const MemoizedSliderSwiper = memo(SliderSwiper);
=======
>>>>>>> develop
