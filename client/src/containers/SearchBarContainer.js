import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

const searchBarStyles = {
  marginBottom: '1.2em',
};

class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchCriteriaChange = this.handleSearchCriteriaChange.bind(this);
  }

  handleInputChange(event) {
    const filterText = event.target.value;
    this.setState({
      filterText,
    });
    this.props.searchProducts(filterText, this.props.searchCriteria);
  }

  handleSearchCriteriaChange(event) {
    // Determine if the selected criteria is valid or not. If not, allow the
    // reducer to return the default value.
    const { searchCriteria } = this.props;
    const acceptableCriteria = 'any product category'.split(' ');
    const criteria = event.target.value;
    const isAcceptable = acceptableCriteria.indexOf(criteria) !== -1;
    this.props.changeSearchCriteria(isAcceptable ? criteria : 'any');

    if (isAcceptable && this.state.filterText && criteria !== searchCriteria) {
      this.props.searchProducts(this.state.filterText, criteria);
    }
  }

  render() {
    return (
      <div className='row' style={searchBarStyles}>
        <div className='col-md-4'>
          <select
            className='c-select pull-xs-right'
            onChange={this.handleSearchCriteriaChange}
          >
            <option>Search Criteria</option>
            <option value='any'>Any</option>
            <option value='product'>Product</option>
            <option value='category'>Category</option>
          </select>
        </div>
        <div className='col-md-4'>
          <input
            className='form-control'
            onChange={this.handleInputChange}
            placeholder={
              `Type a value to search using ${this.props.searchCriteria} search criteria`
            }
            type='text'
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchCriteria } = state;

  return {
    searchCriteria,
  };
};
export default connect(mapStateToProps, actions)(SearchBarContainer);

SearchBarContainer.propTypes = {
  changeSearchCriteria: PropTypes.func.isRequired,
  searchCriteria: PropTypes.string.isRequired,
  searchProducts: PropTypes.func.isRequired,
};