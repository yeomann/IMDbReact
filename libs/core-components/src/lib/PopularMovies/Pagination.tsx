import { PopularMoviesResponse } from '@imbd-react-testing/interfaces';
import React from 'react';

interface IPagination {
  moviesResponse: PopularMoviesResponse, 
  isPreviousData: boolean
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = (props: IPagination) => {
  const { page, total_pages, total_results } = props.moviesResponse
  const { isPreviousData, setPage} = props
  return (
    <>
      <span>Total Results: {total_results}</span>
      <span>Current Page: {page}</span>
      <span>Total Pages: {total_pages}</span>
      <button
        onClick={() => setPage((old: number) => Math.max(old - 1, 0))}
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && total_pages !== page && page < total_pages) {
            setPage((old: number) => old + 1);
          }
        }}
        disabled={page === total_pages}
      >
        Next Page
      </button>
    </>
  );
};

export { Pagination }