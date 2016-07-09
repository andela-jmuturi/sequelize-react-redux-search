import { combineReducers } from 'redux';

import * as actionTypes from '../constants';

export function productsReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return action.products;
    case actionTypes.CLEAR_FILTERED:
      return [];
    default:
      return state;
  }
}

export function searchCriteria(state = 'any', action) {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_CRITERIA:
      return action.searchCriteria;
    default:
      return state;
  }
}

export default combineReducers({
  products: productsReducer,
  searchCriteria,
});
