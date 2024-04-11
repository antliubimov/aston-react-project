export interface FetchMoviesResponse {
  Response: string;
  Search: [];
  totalResults: string;
  Error?: string;
}

export interface MovieType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export type FavoriteType = MovieType & {
  userId: string;
};

export type FavoriteState = {
  favorites: FavoriteType[];
};

export type SearchState = {
  searchItems: MovieType[];
  loading: boolean;
  error: string | undefined;
  response: string;
};

export type HistoryType = {
  id: string;
  url: string;
};

export type HistoryState = {
  history: HistoryType[];
};
