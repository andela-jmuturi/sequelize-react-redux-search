import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Products from '../components/products.jsx';
import ProductsListContainer from './ProductsListContainer';
import CategoriesContainer from './CategoriesContainer';
import SearchBar from './SearchBarContainer';

import * as actions from '../actions';

const mainContent = {
  marginTop: '1.2em',
};

const noProductsStyles = {
  marginTop: '4em',
};

class ProductsContainer extends React.Component {
  renderProducts() {
    const { products, filterText, searchCriteria, isFetching } = this.props;
    if (!products.length) {
      if (filterText && !isFetching) {
        return (
          <div className='text-xs-center' style={noProductsStyles}>
            <p className='lead'>
              No products matching
              {" "}
              "<strong>{filterText}</strong>" were found using
              {" "}
              "<strong>{searchCriteria}</strong>" search criteria.
            </p>
            <p>
              Try changing the search criteria or typing in alternative product names.
            </p>
          </div>
        );
      } else if (filterText && isFetching) {
        return (
          <div className='text-xs-center' style={noProductsStyles}>
            <h1 className='display-4'>Searching...</h1>
          </div>
        );
      }
      return (
        <div className='text-xs-center' style={noProductsStyles}>
          <h4>No Products Yet.</h4>
          <p className='lead'>
            Type a product name or category in the search bar to search.
          </p>
        </div>
      );
    }
    return <Products products={this.props.products} />;
  }

  render() {
    return (
      <div style={mainContent}>
        <div className='text-xs-center'>
          <h1 className='display-4'>Product Search</h1>
        </div>
        <SearchBar />
        <hr />
        <div className='row'>
          <div className='col-md-3'>
            <div className='row'>
              <div className='col-md-9 pull-xs-right'>
                <ProductsListContainer />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            {this.renderProducts()}
          </div>
          <div className='col-md-3'>
            <div className='row'>
              <div className='col-md-9 pull-xs-left'>
                <CategoriesContainer />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

ProductsContainer.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  searchCriteria: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { products, searchCriteria, filterText, isFetching } = state.products;

  return {
    filterText,
    isFetching,
    products,
    searchCriteria,
  };
};

export default connect(mapStateToProps, actions)(ProductsContainer);
