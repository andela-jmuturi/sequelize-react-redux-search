import React from 'react';

const chipStyles = {
  display: 'inline-block',
  padding: '0 0.8rem',
  marginRight: '.25rem',
  fontSize: '0.8rem',
  lineHeight: '1.4rem',
  color: '#757575',
  backgroundColor: '#eee',
  borderRadius: '3rem',
};

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
        <span key={category.id} style={chipStyles}>{category.name}</span>
      )
      }
    </div>
  </div>
);

Product.propTypes = {
  product: React.PropTypes.any.isRequired,
};

export default Product;
