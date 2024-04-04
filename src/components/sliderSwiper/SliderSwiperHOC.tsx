<<<<<<< HEAD
import React, { useCallback, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> develop
import { MovieType } from '../../types/ReduxTypes/MovieType';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SliderSwiperStyles.css';
<<<<<<< HEAD
import { MemoizedSliderSwiper } from './SliderSwiper';
import { historyLSKey } from '../../utils/constants';
=======
import { SliderSwiper } from './SliderSwiper';
>>>>>>> develop

interface SliderSwiperHOCProps {
  movies: MovieType[];
}

export const SliderSwiperHOC = ({ movies }: SliderSwiperHOCProps) => {
  const [modal, setModal] = useState(false);
  const [activeMovie, setactiveMovie] = useState<MovieType>({} as MovieType);

<<<<<<< HEAD
  const handleModalClose = () => setModal(false);

  const saveToLocalStorage = (film: MovieType) => {
    let historyMoviesArray: MovieType[] = [];
    const moviesFromLS = localStorage.getItem(historyLSKey);
    if (!moviesFromLS) {
      historyMoviesArray.push(film);
      localStorage.setItem(historyLSKey, JSON.stringify(historyMoviesArray));
=======
  const handleMovieClick = (movie: MovieType) => {
    setactiveMovie(movie);
    saveToLocalStorage(movie);
    setModal(true);
  };

  const saveToLocalStorage = (film: MovieType) => {
    let historyMoviesArray: MovieType[] = [];
    const moviesFromLS = localStorage.getItem('moviesHistory');
    if (!moviesFromLS) {
      historyMoviesArray.push(film);
      localStorage.setItem('moviesHistory', JSON.stringify(historyMoviesArray));
>>>>>>> develop
      return;
    }
    const parsedMovies: MovieType[] = JSON.parse(moviesFromLS);
    const isMovieExistsInLS = parsedMovies.find(
      (movie) => movie.imdbID === film.imdbID,
    );
    if (isMovieExistsInLS) {
      return;
    }
    historyMoviesArray = [...parsedMovies, film];
    localStorage.setItem('moviesHistory', JSON.stringify(historyMoviesArray));
  };

<<<<<<< HEAD
  const handleMovieClick = useCallback((movie: MovieType) => {
    setactiveMovie(movie);
    saveToLocalStorage(movie);
    setModal(true);
  }, []);

  return (
    <MemoizedSliderSwiper
=======
  return (
    <SliderSwiper
>>>>>>> develop
      activeMovie={activeMovie}
      movies={movies}
      onMovieClick={handleMovieClick}
      isModalOpen={modal}
<<<<<<< HEAD
      handleModalClose={handleModalClose}
=======
      handleModalClose={() => setModal(false)}
>>>>>>> develop
    />
  );
};
