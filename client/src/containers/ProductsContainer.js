import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Products from '../components/products.jsx';
import * as actions from '../actions';


class ProductsContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div>
        <div>
          <input type='text' placeholder='This is where search will be implemented' />
        </div>
        <Products products={this.props.products} />
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
