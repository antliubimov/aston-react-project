import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  MovieType,
  SearchState,
  FetchMoviesResponse,
} from '../../types/ReduxTypes/MovieType';
import { API_URL } from '../../utils/constants/constants';

const initialState: SearchState = {
  searchItems: [] as MovieType[],
  loading: false,
  response: 'True',
  error: undefined,
};

export const fetchMovies = createAsyncThunk(
  'search/fetchMovies',
  async (searchString: string) => {
    const response = await axios.get<FetchMoviesResponse>(
      `${API_URL}&s=${searchString}`,
    );
    return response.data;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchItems: (state) => {
      state.searchItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, { payload }) => {
        if (payload.Response === 'True') {
          state.searchItems = payload.Search;
          state.error = undefined;
          state.response = payload.Response;
        } else {
          state.searchItems = [];
          state.error = payload.Error;
          state.response = payload.Response;
        }
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearSearchItems } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
