import React from 'react';

const Product = ({ product }) => (
  <li>{product.name}</li>
);

Product.propTypes = {
  product: React.PropTypes.any.isRequired,
};

export default Product;
