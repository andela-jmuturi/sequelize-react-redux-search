import { combineReducers } from 'redux';

import * as actionTypes from '../constants';

export function productsReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return action.products;
    default:
      return state;
  }
}

export default combineReducers({
  products: productsReducer,
});
