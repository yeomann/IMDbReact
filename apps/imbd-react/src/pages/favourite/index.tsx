import React, { memo, useState } from 'react';
import {
  useMutation as useMutationRQ,
  useQuery as useQueryRQ,
} from 'react-query';
import {
  MainPagesHeader,
  MainPagesCard,
  RequestError,
} from '@imbd-react-testing/common-components';
import { PageIdslocalStorage } from '@imbd-react-testing/constants';
import { getFavouriteMovies, removeFavouriteMovies } from '../../services/jwt/imdb';
import { DisplayMovies } from '@imbd-react-testing/core-components';
import { ListResponse, MovieEvent } from '@imbd-react-testing/interfaces';
import { message } from 'antd';
import { queryClient } from '../../main';

export function Favourite() {
  const [page, setPage] = useState<number>(1);
  const {
    isLoading: favMoviesLoading,
    data: favMoviesDataSource,
    error,
    isError,
    isFetching,
    isPreviousData,
  } = useQueryRQ(['favouriteMovies', page], () => getFavouriteMovies(page), {
    keepPreviousData: true,
  });

  const mutateRemoveFav = useMutationRQ(removeFavouriteMovies, {
    retry: 3
  });
  const {
    isLoading: removeFavLoading,
    error: removeFavError,
  } = mutateRemoveFav;


  async function handleSave(id: number, eventType: MovieEvent) {
    console.log('remove fav movie id', id);
    let response: ListResponse;

    try {
      switch (eventType) {
        case MovieEvent.REMOVE_FAV:
          response = await mutateRemoveFav.mutateAsync(id);
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

  if (isError || removeFavError) {
    return <RequestError err={error} />;
  }

  return (
    <main>
      <MainPagesHeader text="Favourite movies list" />
      <MainPagesCard
        id={PageIdslocalStorage.moviesConfigs}
        showTopLoading={favMoviesLoading || isFetching || removeFavLoading}
      >
        {!favMoviesLoading && (
          <DisplayMovies
            eventHandler={handleSave}
            showDeleteFav={true}
            showDeleteWL={false}
            setPage={setPage}
            isFetching={isFetching}
            isPreviousData={isPreviousData}
            loading={favMoviesLoading}
            moviesResponse={favMoviesDataSource}
          />
        )}
      </MainPagesCard>
    </main>
  );
}

export default memo(Favourite);
