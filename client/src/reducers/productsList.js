import { combineReducers } from 'redux';

import * as actionTypes from '../constants';

export function products(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LIST_SUCCESS:
      return action.products;
    case actionTypes.CREATE_PRODUCT_REQUEST:
      // perform an optimistic update.
      return [
        ...state,
        action.product,
      ];

    case actionTypes.CREATE_PRODUCT_SUCCESS:
      // Rollback the optimistic update and instead accept the new product
      // from the server.
      return [
        ...state.slice(0, state.length - 1),
        action.product,
      ];

    case actionTypes.CREATE_PRODUCT_FAILURE:
      // Rollback our optimistic update.
      return state.slice(0, state.length - 1);

    default:
      return state;
  }
}

export default combineReducers({
  products,
});
