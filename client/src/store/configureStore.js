import { applyMiddleware, createStore } from 'redux';
import thunkMiddlware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
let enhancer = applyMiddleware(thunkMiddlware);

if (process.env.NODE_ENV !== 'production') {
  enhancer = applyMiddleware(thunkMiddlware, loggerMiddleware);
}
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  return store;
}
