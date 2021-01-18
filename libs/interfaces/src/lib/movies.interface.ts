export enum MovieEvent {
  SET_FAV = 'SET_FAV',
  REMOVE_FAV = 'REMOVE_FAV',
  SET_WATCHL = 'SET_WATCHL',
  REMOVE_WATCHL = 'REMOVE_WATCHL',
}
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface ListsMoviesResponse extends MoviesResponse {
  average_rating: number;
  backdrop_path: string;
  comments: Record<string, string>;
  created_by: {
    gravatar_hash: string;
    id: string;
    name: string;
    username: 'dani.ssh';
  };
  description: string;
  id: number;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  object_ids: Record<string, string>;
  poster_path: null;
  public: boolean;
  revenue: number;
  runtime: number;
  sort_by: number;
}

export interface SingleListResponse {
  media_id: number;
  media_type: string;
  success: boolean;
}
export interface ListResponse {
  results: SingleListResponse[];
  status_code: number;
  status_message: string;
  success: boolean;
}
