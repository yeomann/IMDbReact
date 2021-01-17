import { AxiosError, AxiosResponse } from 'axios';
import apiClient from '../axios';
import { IMDB } from '@imbd-react-testing/constants';
import { PopularMoviesResponse } from '@imbd-react-testing/interfaces';
export async function getPopularMovies(
  page: number
): Promise<PopularMoviesResponse> {
  const lang = 'en-US';

  return apiClient
    .get(`${IMDB.POPULAR}?language=${lang}&page=${page}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
}
