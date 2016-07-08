import React from 'react';

import Products from '../components/products.jsx';

const products = 'these are dummy products'.split(' ');

class ProductsContainer extends React.Component { // eslint-disable-line
  render() {
    return (
      <div>
        <div>
          <input type='text' placeholder='This is where search will be implemented' />
        </div>
        <Products products={products} />
      </div>
    );
  }
}

export default ProductsContainer;
