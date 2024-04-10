import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAppSelector, useAppDispatch } from '../../core/hooks/hooks';
import { Search, Film } from '../../types/SearchTypes/searchTypes';
import { SearchInput } from './SearchInput';
import { SearchForm } from './SearchForm';
import './SearchPageStyles.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchMovies } from '../../core/slices/searchSlice';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import { addFavorite } from '../../core/slices/favoritesSlice';
import { useAuth } from '../../core/hooks';
import { SearchCard } from '../../components/SearchCard';

// в работе

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
  const { searchItems, loading } = useAppSelector((state) => state.search);
  const { user } = useAuth();

  useEffect(() => {
    if (filmNameRef.current) {
      filmNameRef.current.focus();
    }
  }, []);

  const handleSubmit = useCallback(
    (e: SyntheticEvent<EventTarget>) => {
      e.preventDefault();
      const searchString = `${SearchData.title}&y=${SearchData.year}`;
      dispatch(fetchMovies(searchString));
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
      {searchItems.length > 0 && (
        <ListGroup as="ul" className="d-flex flex-row flex-wrap gap-4">
          {searchItems.map((movie) => {
            return (
              <ListGroup.Item as="li" key={movie.imdbID} className="col-3 mb-3">
                <SearchCard movie={movie} handleAdd={handleAddFavorite} />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
};
