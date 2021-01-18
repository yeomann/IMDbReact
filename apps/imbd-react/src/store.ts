import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './redux/reducers';
import sagas from './redux/sagas';

function ReduxStore(history): Store<any, AnyAction> {
  const sagaMiddleware = createSagaMiddleware();
  const routeMiddleware = routerMiddleware(history);
  const middlewares = [sagaMiddleware, routeMiddleware];
  // if (process.env.NODE_ENV === 'development') {
  //   middlewares.push(logger)
  // }
  const rootReducer = reducers(history);

  if (process.env.NODE_ENV !== 'production') {
    if (module['hot']) {
      module['hot'].accept('./redux/reducers', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const nextHotReducer = require('./redux/reducers').default;
        const finalReducer = { ...nextHotReducer, router: history };
        store.replaceReducer(finalReducer);
      });
    }
  }

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagas);
  return store;
}

export { ReduxStore };
