import React from 'react';

import Chip from './Chip.jsx';

const Product = ({ product }) => (
  <div className='card card-block'>
    <h4 className='card-title'>
      {product.name}
    </h4>
    <div className='card-text'>
      <p>
        {product.description}
      </p>
      {product.categories.map(category =>
        <Chip key={category.id}>{category.name}</Chip>
      )
      }
    </div>
  </div>
);

Product.propTypes = {
  product: React.PropTypes.any.isRequired,
};

export default Product;
