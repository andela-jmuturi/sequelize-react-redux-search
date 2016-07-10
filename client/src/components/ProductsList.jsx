import React, { PropTypes } from 'react';

import Chip from './Chip.jsx';

const btnStyles = {
  marginTop: '1em',
};

const ProductsList = ({ products, toggleShowCreateProduct }) => (
  <div className='card card-block'>
    <h6 className='card-title text-xs-center'>Names of Available Products</h6>
    <div className='card-text'>
      {products.map((product) => (
        <Chip key={product.id} >
          {product.name}
        </Chip>
      ))}
      <div className='text-xs-center'>
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
