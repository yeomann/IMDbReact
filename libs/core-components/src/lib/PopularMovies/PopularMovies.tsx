import React, { useMemo, useState } from 'react';
import { Table } from 'antd';
import { TableDefaults } from './Definations';
import { Movie, PopularMoviesResponse } from '@imbd-react-testing/interfaces';
import MoviesColumn from './columnDefination';
import { Pagination } from './Pagination';

interface IPopularMovies {
  moviesResponse: PopularMoviesResponse;
  isPreviousData: boolean;
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
}
function PopularMovies(props: IPopularMovies) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    loading,
    isPreviousData,
    setPage,
    isFetching,
    moviesResponse,
  } = props;
  const { page, results, total_pages, total_results } = moviesResponse;
  return (
    <>
      <Pagination 
        setPage={setPage}
        moviesResponse={moviesResponse} 
        isPreviousData={isPreviousData} />
      <Table
        // loading={isFetching ? {tip: "Loading..."} : null}
        dataSource={results}
        columns={useMemo(() => MoviesColumn(), [])}
        pagination={{
          pageSize: TableDefaults.tableSize,
        }}
        // size={densityState}
        tableLayout="fixed"
        rowKey={(record: Movie) => record.id}
      />
    </>
  );
}

export { PopularMovies };
