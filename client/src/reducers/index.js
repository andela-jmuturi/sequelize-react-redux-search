import { combineReducers } from 'redux';

import * as actionTypes from '../constants';

export function products(state = [], action) {
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

export function isFetching(state = false, action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_REQUEST:
      return true;
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
    case actionTypes.FETCH_PRODUCTS_FAILURE:
      return false;
    default:
      return state;
  }
}
export default combineReducers({
  products,
  searchCriteria,
  isFetching,
});
