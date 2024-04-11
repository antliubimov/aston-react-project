import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from '../core/slices/MovieSlice';
import SerialsSlice from '../core/slices/SerialsSlice';
import FilmsToNavbarInputSlice from '../core/slices/navbarInputSlices/FilmsToNavbarInputSlice';
import FilmPageSlice from '../core/slices/filmPageSlice/FilmPageSlice';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    serials: SerialsSlice,
    filmsToNavbarInput: FilmsToNavbarInputSlice,
    film: FilmPageSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
