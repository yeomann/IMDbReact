import React, { FC } from 'react'
import { InsertRowRightOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Tooltip } from 'antd'

interface ITablePagesize {
  pageSize: number
  setPageSize: any
  pageSizeOptions: string[]
  refetchWithPageSize: any
}
const TablePagesize: FC<ITablePagesize> = ({
  pageSize,
  setPageSize,
  pageSizeOptions,
  refetchWithPageSize,
}) => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu
          selectedKeys={[String(pageSize)]}
          onClick={({ key }) => {
            setPageSize(key)
            refetchWithPageSize(key)
          }}
        >
          {pageSizeOptions.map((size) => (
            <Menu.Item key={size}>{size}</Menu.Item>
          ))}
        </Menu>
      }
    >
      <Tooltip title="Change record count Per Page">
        <InsertRowRightOutlined className="tableTopBarIcon" />
      </Tooltip>
    </Dropdown>
  )
}

export default TablePagesize
