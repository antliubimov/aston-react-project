import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from '../core/slices/MovieSlice';
import { featureFlagApi } from '../core/api/featureFlagApi';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    [featureFlagApi.reducerPath]: featureFlagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(featureFlagApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
