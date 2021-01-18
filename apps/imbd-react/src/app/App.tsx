import React, { memo, useEffect, useState } from 'react';
import {
  useMutation as useMutationRQ,
  useQuery as useQueryRQ,
} from 'react-query';
import {
  getPopularMovies,
  searchMovies,
  setFavouriteMovies,
  setWatchLMovies,
} from '../services/jwt/imdb';
import { DisplayMovies, SearchMovies } from '@imbd-react-testing/core-components';
import {
  MainPagesHeader,
  MainPagesCard,
  RequestError,
} from '@imbd-react-testing/common-components';
import { PageIdslocalStorage } from '@imbd-react-testing/constants';
import { ListResponse, MovieEvent, MoviesResponse, SearchFilterInput } from '@imbd-react-testing/interfaces';
import { message } from 'antd';
import { queryClient } from '../main';


export function App() {
  const [title, setTitle] = useState<string>('Live Popular Movies')
  const [searchText, setsearchText] = useState<string>('')
  const [searchStatus, setSearchStatus] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<{
    data: MoviesResponse,
    loading: boolean
  }>()

  const {
    isLoading: popularMoviesLoading,
    data: popularMoviesDataSource,
    error,
    isError,
    isFetching,
    isPreviousData,
  } = useQueryRQ(['popularMovies', page], () => getPopularMovies(page), {
    keepPreviousData: true,
    enabled: !searchStatus
  });
  const {
    isLoading: searchMoviesLoading,
    data: searchMoviesDataSource,
    error: searchMoviesError,
    isError: searchMoviesIsError,
    isFetching: searchMoviesIsFetching,
    isPreviousData: searchMoviesIsPreviousData,
  } = useQueryRQ(['searchMovies', {
    searchText,
    page
  }], () => searchMovies(searchText, page, false), {
    keepPreviousData: false,
    enabled: searchStatus
  });

  const mutateSetFav = useMutationRQ(setFavouriteMovies, {
    retry: 3
  });
  const mutateSetWatchL = useMutationRQ(setWatchLMovies, {
    retry: 3
  });
  const { isLoading: setFavLoading, error: setFavError } = mutateSetFav;
  const {
    isLoading: setWatchLLoading,
    error: setWatchLError,
  } = mutateSetWatchL;

  useEffect(() => {
    if(searchStatus === false) {
      setDataSource({
        data: popularMoviesDataSource,
        loading: popularMoviesLoading
      })
    } else {
      setDataSource({
        data: searchMoviesDataSource,
        loading: searchMoviesLoading
      })
    }
  }, [searchStatus, popularMoviesDataSource, popularMoviesLoading, searchMoviesDataSource, searchMoviesLoading])

  async function handleSave(id: number, eventType: MovieEvent) {
    console.log('movie id', id);
    let response: ListResponse;
    try {
      switch (eventType) {
        case MovieEvent.SET_FAV:
          response = await mutateSetFav.mutateAsync(id);
          break;
        case MovieEvent.SET_WATCHL:
          response = await mutateSetWatchL.mutateAsync(id);
          break;
      }

      if (response && response.status_code === 1 && response.success) {
        message.success('Action performed successfully!');
      } else {
        message.destroy();
        message.error({
          content: (
            <>
              <span>Error performing action</span>
              <small className="d-block mt-1 italic">Please try again..</small>
            </>
          ),
        });
      }
      queryClient.invalidateQueries()
    } catch (e) {
      console.log(e);
      message.destroy();
      message.error('Network error, please check your connection');
    } finally {
      console.log('done');
    }
  }

  function callSearchMovies(values: SearchFilterInput) {
    setTitle('Display search results')
    setsearchText(values.searchInput)
    setSearchStatus(true)
  }

  function resetSearchMovies() {
    setSearchStatus(false)
    setPage(1)
    setTitle('Live Popular Movies')
    // setSearchStatus
  }

  if (isError || setFavError || setWatchLError || searchMoviesIsError) {
    return <RequestError err={error} />;
  }

  return (
    <main>
      <MainPagesCard
        id={PageIdslocalStorage.moviesConfigs}
        showTopLoading={
          popularMoviesLoading ||
          isFetching ||
          setFavLoading ||
          setWatchLLoading || searchMoviesLoading
        }
      >
        <SearchMovies onSubmit={callSearchMovies} resetState={searchStatus} resetFunc={resetSearchMovies}  />
        <MainPagesHeader text={title} />

        <DisplayMovies
          eventHandler={handleSave}
          showDeleteFav={false}
          showDeleteWL={false}
          setPage={setPage}
          isFetching={searchStatus ? searchMoviesIsFetching : isFetching}
          isPreviousData={searchStatus ? searchMoviesIsPreviousData : isPreviousData}
          loading={searchStatus ? searchMoviesLoading : popularMoviesLoading}
          moviesResponse={searchStatus ? searchMoviesDataSource : popularMoviesDataSource}
        />
      </MainPagesCard>
    </main>
  );
}

export default memo(App);
