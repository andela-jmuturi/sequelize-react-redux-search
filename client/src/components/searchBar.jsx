import React from 'react';

const searchBarStyles = {
  marginBottom: '1.2em',
};

const SearchBar = () => (
  <div className='row' style={searchBarStyles}>
    <div className='col-md-4 col-md-offset-4'>
      <input
        className='form-control'
        placeholder='This is where search will be implemented'
        type='text'
      />
    </div>
  </div>
);

export default SearchBar;
