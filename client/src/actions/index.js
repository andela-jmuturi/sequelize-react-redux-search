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


export const fetchProductsList = () => (dispatch) => Axios
  .get('/api/products')
  .then(response => {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
      products: response.data,
    });
  });

export const createProduct = (product) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_PRODUCT_REQUEST,
    product: {
      ...product,
      categories: [],
      id: Math.floor(Math.random() * 100000).toString(),
    },
  });

  return Axios
    .post('/api/products', product)
    .then(response => {
      dispatch({
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        product: response.data,
      });
    }, error => {
      dispatch({
        type: actionTypes.CREATE_PRODUCT_FAILURE,
        error: error.data || { message: 'Failed to create product' },
        product,
      });
      return Promise.reject(); // Needed for chaining in the component.
    });
};

export const fetchCategories = () => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_CATEGORIES_REQUEST,
  });

  return Axios
    .get('/api/category')
    .then(response => {
      dispatch({
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories: response.data,
      });
    }, error => {
      dispatch({
        type: actionTypes.FETCH_CATEGORIES_FAILURE,
        error: error.data || { message: 'Failed to fetch categories' },
      });
    });
};

export const createCategory = ({ name }) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_CATEGORY_REQUEST,
    category: {
      name,
      id: Math.floor(Math.random(1000000)).toString(32),
    },
  });

  return Axios
    .post('/api/category', { name })
    .then(response => {
      dispatch({
        type: actionTypes.CREATE_CATEGORY_SUCCESS,
        category: response.data,
      });
    }, error => {
      dispatch({
        type: actionTypes.CREATE_CATEGORY_FAILURE,
        error: error.data || { message: 'Failed to create category' },
        category: {
          name,
        },
      });
    });
};

export const toggleShowCreateCategory = () => ({
  type: actionTypes.TOGGLE_CREATE_CATEGORY,
});

export const toggleShowCreateProduct = () => ({
  type: actionTypes.TOGGLE_CREATE_PRODUCT,
});
