import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../../core/hooks/hooks';
import { Search, Film } from '../../types/SearchTypes/searchTypes';
import { SearchInput } from '../../components/SearchInput';
import { SearchForm } from '../../components/SearchForm';
import './SearchPageStyles.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { clearSearchItems, fetchMovies } from '../../core/slices/searchSlice';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { addFavorite } from '../../core/slices/favoritesSlice';
import { useAuth } from '../../core/hooks';
import { SearchCard } from '../../components/SearchCard';
import { addHistory } from '../../core/slices/historySlice';

const initialState: Search = {
  title: '',
  year: '',
};

const errors: Film = {
  titleError: 'Фильм не найден',
  yearError: 'Фильм не найден',
};

export const SearchPage = () => {
  const [SearchData, setSearchData] = useState<Search>(initialState);
  const filmNameRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { searchItems, response, error } = useAppSelector(
    (state) => state.search,
  );
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (filmNameRef.current) {
      filmNameRef.current.focus();
    }
    const title = searchParams.get('movie');
    const year = searchParams.get('year');
    let searchString = '';
    if (title && year) {
      searchString = `${title}&y=${year}`;
    } else if (title) {
      searchString = title;
    }
    if (searchString) {
      dispatch(fetchMovies(searchString));
    } else {
      dispatch(clearSearchItems());
    }
  }, []);

  const handleSubmit = useCallback(
    (e: SyntheticEvent<EventTarget>) => {
      e.preventDefault();
      const { title, year } = SearchData;
      setSearchParams({ movie: title, year: year });
      const searchString = year ? `${title}&y=${year}` : `${title}`;
      dispatch(fetchMovies(searchString));
      const url = window.location.href;
      dispatch(addHistory({ id: _.uniqueId(), url }));
    },
    [SearchData, searchItems, fetchMovies],
  );

  const handleAddFavorite = useCallback(
    (movie: MovieType) => () => {
      if (user) {
        dispatch(addFavorite({ ...movie, userId: user?.username }));
      }
    },
    [dispatch, searchItems, user],
  );

  return (
    <>
      <SearchForm title="Поиск" btnName="Поиск" onSubmit={handleSubmit}>
        <SearchInput
          label="Название фильма"
          name="title"
          type="text"
          data={SearchData}
          setData={setSearchData}
          errors={errors}
          filmRef={filmNameRef}
          required={true}
        />
        <SearchInput
          label="Год релиза"
          name="year"
          type="text"
          data={SearchData}
          setData={setSearchData}
          errors={errors}
        />
      </SearchForm>
      {response === 'True' ? (
        <ListGroup as="ul" className="d-flex flex-row flex-wrap gap-4">
          {searchItems.map((movie: MovieType) => {
            return (
              <ListGroup.Item as="li" key={movie.imdbID} className="col-3 mb-3">
                <SearchCard movie={movie} handleAdd={handleAddFavorite} />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
};
