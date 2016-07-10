import React, { PropTypes } from 'react';

import Chip from './Chip.jsx';


const btnStyles = {
  marginTop: '1em',
};

const CategoriesList = ({ categories, toggleShowCreateCategory }) => (
  <div className='card card-block'>
    <h6 className='class-title text-xs-center'>Available Categories</h6>
    <div className='card-text'>
      {categories.map((category) => (
        <Chip key={category.id}>{category.name}</Chip>
      ))}
      <div className='text-xs-center'>
        <button
          className='btn btn-sm btn-primary-outline'
          onClick={toggleShowCreateCategory}
          style={btnStyles}
        >
          New Category
        </button>
      </div>

    </div>
  </div>
);

export default CategoriesList;

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  toggleShowCreateCategory: PropTypes.func.isRequired,
};
