import { Dispatch } from 'redux';
import { FetchMoviesResponse } from '../../types/ReduxTypes/MovieType';
import { movieSlice } from './MovieSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../routes/routes';

export const fetchMovies = () => async (dispatch: Dispatch) => {
  try {
    dispatch(movieSlice.actions.moviesFetching());
    const response = await axios.get<FetchMoviesResponse>(
      `${API_URL}&s=star_wars`,
    );

    dispatch(movieSlice.actions.moviesFetchingSuccess(response.data.Search));
  } catch (e: any) {
    dispatch(movieSlice.actions.moviesFetchingError(e.message));
  }
};
