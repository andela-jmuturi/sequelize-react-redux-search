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

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsRequest());

  return Axios
    .get('/api/products')
    .then(response => {
      dispatch(fetchProductsSuccess(response.data));
    }, error => {
      dispatch(fetchProductsFailure(error));
    });
};
