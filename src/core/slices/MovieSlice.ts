import { MovieType } from '../../types/ReduxTypes/MovieType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  movies: MovieType[];
  isLoading: boolean;
  error: string;
}

const initialState: MovieState = {
  movies: [],
  isLoading: false,
  error: '',
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    moviesFetchingSuccess(state, action: PayloadAction<MovieType[]>) {
      state.movies = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    moviesFetching(state) {
      state.isLoading = true;
      state.error = '';
    },
    moviesFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default movieSlice.reducer;
