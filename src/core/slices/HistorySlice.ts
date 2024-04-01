import { MovieType } from '../../types/ReduxTypes/MovieType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  history: string[];
  movies: MovieType[];
  isLoading: boolean;
  errorCode: string | null;
}

const initialState: HistoryState = {
  history: [],
  movies: [],
  isLoading: false,
  errorCode: null,
};

export const historySlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovieToHistory(state, action: PayloadAction<string>) {
      if (state.history.includes(action.payload)) {
        return;
      }
      state.history = [...state.history, action.payload];
    },
    historyFetchingSuccess(state, action: PayloadAction<MovieType[]>) {
      state.movies = action.payload;
      state.isLoading = false;
      state.errorCode = null;
    },
    historyFetching(state) {
      state.isLoading = true;
      state.errorCode = null;
    },
    historyFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.errorCode = action.payload;
    },
  },
});

export default historySlice.reducer;
