import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Products from '../components/products.jsx';
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
        <div className='row'>
          <div className='col-md-6 col-md-offset-3'>
            {this.renderProducts()}
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
  const { products, searchCriteria, filterText } = state.products;

  return {
    filterText,
    products,
    searchCriteria,
  };
};

export default connect(mapStateToProps, actions)(ProductsContainer);
