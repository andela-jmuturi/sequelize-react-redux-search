import Axios from 'axios';

import * as actionTypes from '../constants';

const fetchProductsRequest = () => ({
  type: actionTypes.FETCH_PRODUCTS_REQUEST,
});

const fetchProductsSuccess = (products) => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  products,
});

const fetchProductsFailure = (error) => ({
  type: actionTypes.FETCH_PRODUCTS_FAILURE,
  error: error.data || { message: 'Failed to fetch products' },
});

export const fetchProducts = (query) => (dispatch) => {
  dispatch(fetchProductsRequest());

  return Axios
    .get(`/api/products${query || ''}`)
    .then(response => {
      dispatch(fetchProductsSuccess(response.data));
    }, error => {
      dispatch(fetchProductsFailure(error));
    });
};

export const changeSearchCriteria = (searchCriteria) => ({
  type: actionTypes.CHANGE_SEARCH_CRITERIA,
  searchCriteria,
});

export const changeFilterText = (filterText) => ({
  type: actionTypes.CHANGE_FILTER_TEXT,
  filterText,
});

export const searchProducts = (filterText, searchCriteria) => (dispatch) => {
  if (!filterText) {
    return dispatch({
      type: actionTypes.CLEAR_FILTERED,
    });
  }

  const query = `?criteria=${searchCriteria}&filterText=${filterText}`;
  return dispatch(fetchProducts(query));
};
