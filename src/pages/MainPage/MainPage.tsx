import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMovies } from '../../core/slices/FetchMovies';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <div className="App">
      {movies.map((movie) => (
        <div key={movie.imdbID}>{movie.Title}</div>
      ))}
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>Произошла ошибка при загрузке</h1>}
    </div>
  );
};

export default MainPage;
