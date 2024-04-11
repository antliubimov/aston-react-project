import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from '../core/slices/MovieSlice';
import { featureFlagApi } from '../core/api/featureFlagApi';
import SerialsSlice from '../core/slices/SerialsSlice';
<<<<<<< HEAD
=======
import FilmsToNavbarInputSlice from '../core/slices/navbarInputSlices/FilmsToNavbarInputSlice';
import FilmPageSlice from '../core/slices/filmPageSlice/FilmPageSlice';
>>>>>>> develop
import { favoritesReducer } from '../core/slices/favoritesSlice';
import { searchReducer } from '../core/slices/searchSlice';
import { historyReducer } from '../core/slices/historySlice';
import { favoritesListenerMiddleware } from '../core/middlewares/favoritesMiddleware';
<<<<<<< HEAD
import FilmsToNavbarInputSlice from '../core/slices/navbarInputSlices/FilmsToNavbarInputSlice';
=======
>>>>>>> develop

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    serials: SerialsSlice,
<<<<<<< HEAD
=======
    filmsToNavbarInput: FilmsToNavbarInputSlice,
    film: FilmPageSlice,
>>>>>>> develop
    favorites: favoritesReducer,
    search: searchReducer,
    history: historyReducer,
    [featureFlagApi.reducerPath]: featureFlagApi.reducer,
<<<<<<< HEAD
    filmsToNavbarInput: FilmsToNavbarInputSlice,
=======
>>>>>>> develop
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
