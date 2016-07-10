import React, { PropTypes } from 'react';

const searchBarStyles = {
  marginBottom: '1.2em',
};

const SearchBar = (props) => (
  <div className='row' style={searchBarStyles}>
    <div className='col-md-4'>
      <select
        className='c-select pull-xs-right'
        onChange={props.handleSearchCriteriaChange}
      >
        <option>Search Criteria</option>
        <option value='any'>Any</option>
        <option value='product'>Product</option>
        <option value='category'>Category</option>
      </select>
    </div>
    <div className='col-md-4'>
      <div className='input-group'>
        <input
          className='form-control'
          onChange={props.handleInputChange}
          placeholder={
            `Type a value to search using ${props.searchCriteria} search criteria`
          }
          type='text'
        />
        {props.isFetching && (
          <div className='input-group-addon'>
            <div className='loader'></div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default SearchBar;

SearchBar.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSearchCriteriaChange: PropTypes.func.isRequired,
  searchCriteria: PropTypes.string.isRequired,
};
