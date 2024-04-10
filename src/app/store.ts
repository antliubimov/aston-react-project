import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from '../core/slices/MovieSlice';
import { featureFlagApi } from '../core/api/featureFlagApi';
import SerialsSlice from '../core/slices/SerialsSlice';
import { favoritesReducer } from '../core/slices/favoritesSlice';
import { searchReducer } from '../core/slices/searchSlice';
import { favoritesListenerMiddleware } from '../core/middlewares/favoritesMiddleware';
import FilmsToNavbarInputSlice from '../core/slices/navbarInputSlices/FilmsToNavbarInputSlice';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    serials: SerialsSlice,
    favorites: favoritesReducer,
    search: searchReducer,
    [featureFlagApi.reducerPath]: featureFlagApi.reducer,
    filmsToNavbarInput: FilmsToNavbarInputSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      featureFlagApi.middleware,
      favoritesListenerMiddleware.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
