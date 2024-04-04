import { Dispatch } from 'redux';
import { FetchMoviesResponse } from '../../types/ReduxTypes/MovieType';
import { movieSlice } from './MovieSlice';
import axios from 'axios';
import { API_URL } from '../../routes/routes';

export const fetchMovies = () => async (dispatch: Dispatch) => {
  try {
    //   const urlsToFetch = [`${API_URL}&s=day&page=1`, `${API_URL}&s=day&page=2`];

    //   const fetchPromises = urlsToFetch.map((url) =>
    //   fetch(url).then((response) => response.json()),
    // );

    //  Promise.all(fetchPromises).then((responses) => {
    //   const responseData = responses.map((response) => response);
    //   console.log(responseData);
    //     });

    dispatch(movieSlice.actions.moviesFetching());
    const response = await axios.get<FetchMoviesResponse>(
      `${API_URL}&s=day&page=2`,
    );
    dispatch(movieSlice.actions.moviesFetchingSuccess(response.data.Search));
  } catch (e: any) {
    dispatch(movieSlice.actions.moviesFetchingError(e.message));
  }
};
