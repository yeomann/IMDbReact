import React, { FC } from 'react'
import { Spin } from 'antd';
import classnames from 'classnames'

const SingleLineLoading: FC<{
  text: string
  size?: "small" | "default" | "large"
  center?: boolean
  absoluteCenter?: boolean
}> = ({ text, size, center, absoluteCenter }) => (
  <span
    className={classnames('d-flex align-center', {
      'justify-center': center,
      'justify-center p-ab w-100': absoluteCenter,
    })}
  >
    {text}
    <Spin className="ml-2" size={size} />
  </span>
)

export { SingleLineLoading }
