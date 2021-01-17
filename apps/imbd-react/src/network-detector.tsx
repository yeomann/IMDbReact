import React, { useState } from 'react'
import { WarningOutlined, CheckOutlined } from '@ant-design/icons'
import { CSSProperties } from 'styled-components'
import { Affix } from 'antd'
import { Detector } from 'react-detect-offline'
import localStore from 'store'

const commonStyles: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
  height: '60px',
}

const errorStyles: CSSProperties = {
  background: '#ff0808',
}

const successStyles: CSSProperties = {
  background: 'rgb(91 185 131)',
}

export default function(ComposedComponent: any) {
  const { REST_EP } = localStore.get('config')
  
  return (props: any) => {
    const [onlineStatusOnchange, setOnlineStatusOnchange] = useState<boolean>(false)

    return (
      <>
        <Detector
          polling={{ url: `${REST_EP}`, interval: 50000 }}
          onChange={(status: boolean) => {
            if (status) {
              setOnlineStatusOnchange(true)

              setTimeout(() => {
                setOnlineStatusOnchange(false)
              }, 3000)
            }
          }}
          render={({ online }) => {
            return (
              <>
                {!online && (
                  <Affix offsetTop={0}>
                    <div style={{ ...errorStyles, ...commonStyles }}>
                      <span style={{ lineHeight: '62px' }}>
                        <WarningOutlined style={{ marginRight: 5 }} />
                        Sorry, we’re having trouble reaching the server, please check your internet
                      </span>
                    </div>
                  </Affix>
                )}
                {online && onlineStatusOnchange && (
                  <Affix offsetTop={0}>
                    <div style={{ ...successStyles, ...commonStyles }}>
                      <span style={{ lineHeight: '62px' }}>
                        <CheckOutlined style={{ marginRight: 5 }} /> Back online
                      </span>
                    </div>
                  </Affix>
                )}
              </>
            )
          }}
        />
        <ComposedComponent {...props} />
      </>
    )
  }
}