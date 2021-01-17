import React, { memo, useEffect, useMemo, useState } from 'react';
import './app.scss';
import localStore from 'store';
import { ReactComponent as Logo } from './logo.svg';
import { Route, Link } from 'react-router-dom';
import { Table } from 'antd';
import {
  useMutation as useMutationRQ,
  useQuery as useQueryRQ,
} from 'react-query';
import { getPopularMovies } from '../services/jwt/imdb';
import { AppLayout, PopularMovies,  } from '@imbd-react-testing/core-components';
import {
  MainPagesHeader,
  MainPagesCard,
  RequestError,
} from '@imbd-react-testing/common-components';
import { PageIdslocalStorage } from '@imbd-react-testing/constants';

export function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const {
    isLoading: popularMoviesLoading,
    data: popularMoviesDataSource,
    error,
    isError,
    isFetching,
    isPreviousData,
  } = useQueryRQ(['popularMovies', page], () => getPopularMovies(page), {
    keepPreviousData: true,
  });

  if (isError) {
    return <RequestError err={error} />;
  }
  return (
    <AppLayout>
      <main>
        <MainPagesHeader text="Popular Movies" />
        <MainPagesCard
          id={PageIdslocalStorage.moviesConfigs}
          showTopLoading={popularMoviesLoading}
        >
          {!popularMoviesLoading && <PopularMovies 
            setPage={setPage}
            isFetching={isFetching} 
            isPreviousData={isPreviousData} 
            loading={popularMoviesLoading}
            moviesResponse={popularMoviesDataSource} />}
        </MainPagesCard>
      </main>
    </AppLayout>
  );
}

export default memo(App);
