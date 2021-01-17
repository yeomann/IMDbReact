import React, { FC } from 'react'
import { Row, Col, Alert } from 'antd'

interface ITableHeader {
  count: number | undefined
  total: number | undefined
  PaginationComponent: () => JSX.Element
}

const TableHeader: FC<ITableHeader> = ({ count, total, PaginationComponent }) => {
  const message =
    total !== undefined ? `Displaying ${count} out of total ${total}` : 'No data found'
  // if (singleUserId !== undefined) return <></>

  return (
    <Row gutter={[0, 0]} align="middle" justify="space-around">
      <Col span={22}>
        <Alert message={message} type="info" showIcon />
      </Col>
      <Col span={2} className="d-flex justify-end">
        <PaginationComponent />
      </Col>
    </Row>
  )
}

export default TableHeader
