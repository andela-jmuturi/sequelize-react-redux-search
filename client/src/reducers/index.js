import { combineReducers } from 'redux';

import products from './products';
import productsList from './productsList';
import categories from './categories';

export default combineReducers({
  categories,
  products,
  productsList,
});
