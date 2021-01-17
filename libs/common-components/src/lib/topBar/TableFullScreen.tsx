import React, { useEffect, useState, FC } from 'react'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
// import { useIntl } from '../intlContext'

const TableFullScreenIcon: FC<{ id: string }> = ({ id }) => {
  // const intl = useIntl()
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  useEffect(() => {
    document.onfullscreenchange = () => {
      setFullscreen(!!document.fullscreenElement)
    }
  }, [])
  return fullscreen ? (
    <Tooltip title="Exit Fullscreen">
      <FullscreenExitOutlined
        style={{
          fontSize: '1.5rem',
        }}
        // @ts-ignore
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen()
          }
        }}
      />
    </Tooltip>
  ) : (
    <Tooltip title="Go Fullscreen">
      <FullscreenOutlined
        className="tableTopBarIcon"
        onClick={() => document.getElementById(id)?.requestFullscreen()}
      />
    </Tooltip>
  )
}

export default TableFullScreenIcon
