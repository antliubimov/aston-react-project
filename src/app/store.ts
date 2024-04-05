import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from '../core/slices/MovieSlice';
import { featureFlagApi } from '../core/api/featureFlagApi';
import SerialsSlice from '../core/slices/SerialsSlice';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    serials: SerialsSlice,
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
