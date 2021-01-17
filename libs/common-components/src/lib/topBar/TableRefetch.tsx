import React, { useContext, FC } from 'react'
import { RedoOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Tooltip } from 'antd'
// import { TagsContext } from '../tagsContext'

// import Container from '../../container'
// import { useIntl } from '../intlContext'

export type DensitySize = 'middle' | 'small' | 'large' | undefined

const TableRefetch: FC<{ refetchFunc: any }> = ({ refetchFunc }) => {
  // const { reloadTags } = useContext(TagsContext)
  // const intl = useIntl()
  return (
    <Tooltip title="Refetch Again">
      <RedoOutlined onClick={() => refetchFunc()} className="tableTopBarIcon" />
    </Tooltip>
  )
}

export default TableRefetch
