import React, { PropTypes } from 'react';

import Chip from './Chip.jsx';

const CategoriesList = ({ categories }) => (
  <div className='card card-block'>
    <h6 className='class-title text-xs-center'>Available Categories</h6>
    <div className='card-text'>
      {categories.map((category) => (
        <Chip key={category.id}>{category.name}</Chip>
      ))}
    </div>
  </div>
);

export default CategoriesList;

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
};
