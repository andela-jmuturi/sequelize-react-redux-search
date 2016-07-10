import React, { PropTypes } from 'react';

const nameStyles = {
  fontSize: '0.9em',
};

const btnStyles = {
  marginTop: '1em',
};

const ProductsList = ({ products, toggleShowCreateProduct }) => (
  <div className='card card-block text-xs-center'>
    <h6 className='card-title'>Names of Available Products</h6>
    <div className='card-text'>
      {products.map((product, index) => (
        <span key={product.id} style={nameStyles}>
          {product.name}{index < products.length - 1 ? ', ' : ''}
        </span>
      ))}
      <div>
        <button
          className='btn btn-sm btn-primary-outline'
          onClick={toggleShowCreateProduct}
          style={btnStyles}
        >
          New Product
        </button>
      </div>
    </div>
  </div>
);

export default ProductsList;

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  toggleShowCreateProduct: PropTypes.func.isRequired,
};
