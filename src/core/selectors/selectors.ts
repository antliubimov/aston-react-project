import { RootState } from '../../app/store';
import { MovieState } from '../slices/MovieSlice';
import { SerialsState } from '../slices/SerialsSlice';
import { FilmsToNavbarInputState } from './../slices/navbarInputSlices/FilmsToNavbarInputSlice';

export const stateMovies = (state: RootState): MovieState => state.movies;
export const stateSerials = (state: RootState): SerialsState => state.serials;
export const stateFilmsToNavbarInput = (
  state: RootState,
): FilmsToNavbarInputState => state.filmsToNavbarInput;
