import React, { useContext, FC } from 'react'
import { ColumnHeightOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Tooltip } from 'antd'
// import Container from '../../container'
// import { useIntl } from '../intlContext'

export type DensitySize = 'middle' | 'small' | 'large' | undefined

interface ITableDensity {
  densityState: any
  setDensityState: any
}
const TableDensity: FC<ITableDensity> = ({ densityState, setDensityState }) => {
  // const intl = useIntl()
  // const { densityState, setDensityState } = useContext(TagsContext)
  return (
    <Dropdown
      overlay={
        <Menu
          selectedKeys={[densityState as string]}
          onClick={({ key }) => {
            setDensityState(key as DensitySize)
          }}
          style={{
            width: 80,
          }}
        >
          <Menu.Item key="large">Large</Menu.Item>
          <Menu.Item key="middle">Middle</Menu.Item>
          <Menu.Item key="small">Small</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Table density">
        <ColumnHeightOutlined className="tableTopBarIcon" />
      </Tooltip>
    </Dropdown>
  )
}

export default TableDensity
