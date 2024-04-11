import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HistoryState, HistoryType } from '../../types/ReduxTypes/MovieType';

const initialState: HistoryState = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<HistoryType>) => {
      if (!_.find(state.history, { url: action.payload.url })) {
        state.history.unshift(action.payload);
      }
      if (state.history.length > 30) {
        state.history.pop();
      }
    },
    removeHistory: (state, action: PayloadAction<HistoryType>) => {
      state.history = state.history.filter(
        ({ id }) => id !== action.payload.id,
      );
    },
  },
});

export const { addHistory, removeHistory } = historySlice.actions;
export const historyReducer = historySlice.reducer;
