import { combineReducers } from 'redux';

import products from './products';
import productsList from './productsList';

export default combineReducers({
  products,
  productsList,
});
