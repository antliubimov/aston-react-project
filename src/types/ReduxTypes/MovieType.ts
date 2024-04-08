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
