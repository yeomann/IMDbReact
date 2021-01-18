import 'antd/dist/antd.css';
import './styles.scss';
import React, { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import localStore from 'store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { SingleLineLoading } from '@imbd-react-testing/common-components';
import { IEndpointConfig } from '@imbd-react-testing/interfaces';
import { ReduxStore } from './store';
import { hashHistory } from '@imbd-react-testing/core-components';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { routes } from './routes';
import MainLayout from './Layouts/AppLayout'

const queryClient = new QueryClient();
const StartApp = () => {
  const [isConfigReady, setIsConfigReady] = useState<boolean>(false);
  const [startConfig, setStartConfig] = useState<Partial<IEndpointConfig>>({
    REST_EP: '',
    TOKEN: '',
  });
  useEffect(() => {
    fetch('rolling.json')
      .then((data) => data.json())
      .then((conf) => {
        localStore.set('config', conf);
        setStartConfig({
          REST_EP: conf.REST_EP,
          TOKEN: conf.TOKEN,
        });
        setIsConfigReady(true);
      });
  }, []);

  if (isConfigReady && startConfig.REST_EP !== '') {
    return (
      <Provider store={ReduxStore(hashHistory)}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/popular-movies" />}
              />
              {routes.map(({ path, Component, exact }) => {
                return (
                  <Route
                    path={path}
                    key={path}
                    exact={exact}
                    render={() => {
                      return (
                        <Suspense fallback={null}>
                          <MainLayout>
                            <Component />
                          </MainLayout>
                        </Suspense>
                      );
                    }}
                  />
                );
              })}
              <Redirect to="/auth/404" />
            </Switch>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );
  }
  return <SingleLineLoading text="Starting loading Configurations..." />;
};

export { queryClient }

ReactDOM.render(<StartApp />, document.getElementById('root'));
