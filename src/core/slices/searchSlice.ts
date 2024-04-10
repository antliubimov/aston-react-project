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
};

export const fetchMovies = createAsyncThunk(
  'search/fetchMovies',
  async (searchString: string) => {
    const response = await axios.get<FetchMoviesResponse>(
      `${API_URL}&s=${searchString}`,
    );
    return response.data.Search;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, { payload }) => {
        state.searchItems = payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const {} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
