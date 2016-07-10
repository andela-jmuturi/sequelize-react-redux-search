import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import SearchBar from '../components/SearchBar.jsx';

class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      timeout: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchCriteriaChange = this.handleSearchCriteriaChange.bind(this);
  }

  /**
   * Debounce calling the API for 300ms to save on network requests.
   * The API will only be hit if the user doesn't type something else
   * for 300ms.
   */
  handleInputChange(event) {
    const filterText = event.target.value;
    const callLater = () => {
      this.setState({
        timeout: null,
      });
      this.props.searchProducts(filterText, this.props.searchCriteria);
    };

    clearTimeout(this.state.timeout);
    const timeout = setTimeout(callLater, 300);
    this.setState({
      filterText,
      timeout,
    });
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
      <SearchBar
        isFetching={this.props.isFetching}
        handleInputChange={this.handleInputChange}
        handleSearchCriteriaChange={this.handleSearchCriteriaChange}
        searchCriteria={this.props.searchCriteria}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { searchCriteria, isFetching } = state.products;

  return {
    isFetching,
    searchCriteria,
  };
};
export default connect(mapStateToProps, actions)(SearchBarContainer);

SearchBarContainer.propTypes = {
  changeSearchCriteria: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  searchCriteria: PropTypes.string.isRequired,
  searchProducts: PropTypes.func.isRequired,
};
