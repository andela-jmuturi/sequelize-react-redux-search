import React from 'react';

import Product from './product.jsx';

const Products = ({ products }) => (
  <ul>
    {products.map(product => <Product key={product} product={product} />)}
  </ul>
);

Products.propTypes = {
  products: React.PropTypes.array.isRequired,
};

export default Products;
