import React, { FC, ReactNode } from 'react'
import classnames from 'classnames'
// import SingleLineLoading from './SingleLineLoading'
import { Spin } from 'antd'
const MainPagesCard: FC<{
  children: ReactNode
  bodyProps?: any
  id?: string
  showTopLoading?: boolean
  minimumHeight?: boolean
}> = ({ children, bodyProps = {}, id, showTopLoading = false, minimumHeight = false }) => {
  return (
    <Spin spinning={showTopLoading}>
      <div
        className="card mb-0 overflow-hidden"
        id={id}
        style={{ minHeight: minimumHeight ? 800 : 0 }}
      >
        <div className={classnames('card-body', bodyProps)}>{children}</div>
      </div>
    </Spin>
  )
}

export { MainPagesCard }
