import { applyMiddleware, createStore } from 'redux';
import thunkMiddlware from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddlware)
  );

  return store;
}
