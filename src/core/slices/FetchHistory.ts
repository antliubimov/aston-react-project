import { historySlice } from './HistorySlice';
import { Dispatch } from 'redux';
import { FetchMoviesResponse } from '../../types/ReduxTypes/MovieType';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../routes/routes';

export const fetchHistory = () => async (dispatch: Dispatch) => {
  try {
    dispatch(historySlice.actions.historyFetching());
    const response = await axios.get<FetchMoviesResponse>(
      `${API_URL}&s=star_wars`,
    );

    dispatch(historySlice.actions.historyFetchingSuccess(response.data.Search));
  } catch (e: any) {
    dispatch(historySlice.actions.historyFetchingError(e.message));
  }
};
