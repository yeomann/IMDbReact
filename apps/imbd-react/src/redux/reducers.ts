import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import movies from './movies/reducers';
import { History } from 'history';

// export default (history) =>
const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    movies,
  });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
