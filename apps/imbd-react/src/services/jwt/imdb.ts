import { AxiosError, AxiosResponse } from 'axios';
import apiClient, { listApiClient } from '../axios';
import { IMDB } from '@imbd-react-testing/constants';
import { ListResponse, MoviesResponse } from '@imbd-react-testing/interfaces';
const lang = 'en-US';

export async function searchMovies(
  text: string,
  page: number,
  adult: boolean
): Promise<MoviesResponse> {
  return apiClient
    .get(
      `${IMDB.SEARCH_MOVIES}?query=${text}&language=${lang}&page=${page}&include_adult=${adult}`
    )
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}

export async function getPopularMovies(page: number): Promise<MoviesResponse> {
  return apiClient
    .get(`${IMDB.GET_POPULAR_EQ}?language=${lang}&page=${page}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}

export async function getFavouriteMovies(
  page: number
): Promise<MoviesResponse> {
  return listApiClient
    .get(`${IMDB.GET_FAV_EQ}?language=${lang}&page=${page}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}

export async function setFavouriteMovies(
  movieId: number
): Promise<ListResponse> {
  const data = JSON.stringify({
    items: [
      {
        media_type: 'movie',
        media_id: movieId,
      },
    ],
  });
  return listApiClient
    .post(`${IMDB.SET_FAV_EQ}?language=${lang}`, data)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}

export async function removeFavouriteMovies(
  movieId: number
): Promise<ListResponse> {
  const data = JSON.stringify({
    items: [
      {
        media_type: 'movie',
        media_id: movieId,
      },
    ],
  });
  return listApiClient
    .delete(`${IMDB.REMOVE_FAV_EQ}?language=${lang}`, { data })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}

export async function getWatchLaterMovies(
  page: number
): Promise<MoviesResponse> {
  return listApiClient
    .get(`${IMDB.GET_WATCHL_EQ}?language=${lang}&page=${page}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}

export async function setWatchLMovies(movieId: number): Promise<ListResponse> {
  const data = JSON.stringify({
    items: [
      {
        media_type: 'movie',
        media_id: movieId,
      },
    ],
  });
  return listApiClient
    .post(`${IMDB.SET_WATCHL_EQ}?language=${lang}`, data)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}

export async function removeWatchLMovies(
  movieId: number
): Promise<ListResponse> {
  const data = JSON.stringify({
    items: [
      {
        media_type: 'movie',
        media_id: movieId,
      },
    ],
  });
  return listApiClient
    .delete(`${IMDB.REMOVE_WATCHL_EQ}?language=${lang}`, { data })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}
