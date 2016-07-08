import React from 'react';

import Product from './product.jsx';

const Products = ({ products }) => (
  <div className='card-columns'>
    {products.map(product => <Product key={product.id} product={product} />)}
  </div>
);

Products.propTypes = {
  products: React.PropTypes.array.isRequired,
};

export default Products;
