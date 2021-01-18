import React, { useMemo, useState } from 'react';
import './displayMovies.scss'
import { Alert, Col, Row, Table } from 'antd';
import { TableDefaults } from './Definations';
import { Movie, MovieEvent, MoviesResponse } from '@imbd-react-testing/interfaces';
import MoviesColumn from './columnDefination';
import { Pagination } from './Pagination';

interface IPopularMovies {
  moviesResponse: MoviesResponse;
  isPreviousData: boolean;
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
  eventHandler: (id: number, eventType: MovieEvent) => void
  showDeleteFav: boolean
  showDeleteWL: boolean
}
function DisplayMovies(props: IPopularMovies) {
  const {
    isPreviousData,
    setPage,
    moviesResponse,
    showDeleteFav,
    showDeleteWL,
    eventHandler,
    loading
  } = props;

  // const message =
  // 

  if(!loading)
  return (
    <>
      <Row gutter={[0, 0]} align="middle" justify="space-around">
        <Col span={20}>
          <Alert message={moviesResponse.total_results !== 0 ? `Displaying ${moviesResponse.results.length} out of total ${moviesResponse.total_results}` : 'No data found'} type="info" showIcon />
        </Col>
        <Col span={4} className="d-flex justify-end">
          <Pagination 
            setPage={setPage}
            moviesResponse={moviesResponse} 
            isPreviousData={isPreviousData} />
        </Col>
      </Row>
      <Table
        // loading={isFetching ? {tip: "Loading..."} : null}
        dataSource={moviesResponse.results}
        // columns={useMemo(() => MoviesColumn(showDeleteFav, showDeleteWL, eventHandler), [])}
        columns={MoviesColumn(showDeleteFav, showDeleteWL, eventHandler)}
        pagination={{
          hideOnSinglePage: true,
          pageSize: TableDefaults.tableSize,
        }}
        // size={densityState}
        tableLayout="fixed"
        rowKey={(record: Movie) => record.id}
      />
    </>
  );

  return null

}

export { DisplayMovies };
