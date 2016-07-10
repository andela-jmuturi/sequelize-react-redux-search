import { combineReducers } from 'redux';

import * as actionTypes from '../constants';

export function categories(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return action.categories;

    default:
      return state;
  }
}

export function isFetching(state = false, action) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_REQUEST:
      return true;
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
    case actionTypes.FETCH_CATEGORIES_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  isFetching,
});
