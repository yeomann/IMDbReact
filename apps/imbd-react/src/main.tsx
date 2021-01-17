import 'antd/dist/antd.css';
import './styles.scss'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import localStore from 'store'
import { QueryClient, QueryClientProvider } from 'react-query'

import { SingleLineLoading } from "@imbd-react-testing/common-components"
import { IEndpointConfig } from '@imbd-react-testing/interfaces'
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';

const queryClient = new QueryClient()
const StartApp = () => {
  const [isConfigReady, setIsConfigReady] = useState<boolean>(false)
  const [startConfig, setStartConfig] = useState<Partial<IEndpointConfig>>({
    REST_EP: '',
    TOKEN: ''
  })
  useEffect(() => {
    fetch('rolling.json')
      .then((data) => data.json())
      .then((conf) => {
        localStore.set('config', conf)
        setStartConfig({
          REST_EP: conf.REST_EP,
          TOKEN: conf.TOKEN
        })
        setIsConfigReady(true)
      })
  }, [])

  if (
    isConfigReady &&
    startConfig.REST_EP !== ''
  ) {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </React.StrictMode>
    )
  }
  return <SingleLineLoading text="Starting loading Configurations..." />
}

ReactDOM.render(<StartApp />, document.getElementById('root'));
