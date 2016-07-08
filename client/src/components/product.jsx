import React from 'react';

const Product = ({ product }) => (
  <div className='card card-block'>
    <h4 className='card-title'>
      {product.name}
    </h4>
    <p className='card-text'>
      {product.description}
    </p>
    <a href='#' className='card-link'>Card link</a>
    <a href='#' className='card-link'>Another link</a>
  </div>
);

Product.propTypes = {
  product: React.PropTypes.any.isRequired,
};

export default Product;
