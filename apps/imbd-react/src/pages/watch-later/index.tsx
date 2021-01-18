import React, { memo, useState } from 'react';
import {
  useMutation as useMutationRQ,
  useQuery as useQueryRQ,
} from 'react-query';
import { DisplayMovies } from '@imbd-react-testing/core-components';
import {
  MainPagesHeader,
  MainPagesCard,
  RequestError,
} from '@imbd-react-testing/common-components';
import { PageIdslocalStorage } from '@imbd-react-testing/constants';
import { ListResponse, MovieEvent } from '@imbd-react-testing/interfaces';
import { message } from 'antd';
import {
  getWatchLaterMovies,
  removeWatchLMovies,
} from '../../services/jwt/imdb';
import { queryClient } from '../../main';

export function WatchLater() {
  const [page, setPage] = useState<number>(1);
  const {
    isLoading: watchLMoviesLoading,
    data: watchLMoviesDataSource,
    error,
    isError,
    isFetching,
    isPreviousData,
  } = useQueryRQ(['watchLaterMovies', page], () => getWatchLaterMovies(page), {
    keepPreviousData: true,
  });

  const mutateRemoveWatchL = useMutationRQ(removeWatchLMovies);
  const {
    isLoading: removeWatchLLoading,
    error: removeWatchLError,
  } = mutateRemoveWatchL;

  function handleSave(id: number, eventType: MovieEvent) {
    console.log('movie id', id);
    let response: ListResponse;

    try {
      switch (eventType) {
        case MovieEvent.REMOVE_WATCHL:
          return mutateRemoveWatchL.mutateAsync(id);
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

  if (isError || removeWatchLError) {
    return <RequestError err={error} />;
  }
  return (
    <main>
      <MainPagesHeader text="Watch later movies list" />
      <MainPagesCard
        id={PageIdslocalStorage.moviesConfigs}
        showTopLoading={
          watchLMoviesLoading || isFetching || removeWatchLLoading
        }
      >
        {!watchLMoviesLoading && (
          <DisplayMovies
            eventHandler={handleSave}
            showDeleteFav={false}
            showDeleteWL={true}
            setPage={setPage}
            isFetching={isFetching}
            isPreviousData={isPreviousData}
            loading={watchLMoviesLoading}
            moviesResponse={watchLMoviesDataSource}
          />
        )}
      </MainPagesCard>
    </main>
  );
}

export default memo(WatchLater);
