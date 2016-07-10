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
    const { products } = this.props;
    if (!products.length) {
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
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { products } = state;

  return {
    products,
  };
};

export default connect(mapStateToProps, actions)(ProductsContainer);
