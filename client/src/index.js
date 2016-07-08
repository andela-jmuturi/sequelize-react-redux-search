import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import ProductsContainer from './containers/ProductsContainer';

const store = configureStore();
render(
  <Provider store={store}>
    <ProductsContainer />
  </Provider>,
  document.getElementById('root')
);
