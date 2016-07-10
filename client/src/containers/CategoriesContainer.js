import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import CategoriesList from '../components/CategoriesList.jsx';

class CategoriesContainer extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <CategoriesList categories={this.props.categories} />
    );
  }
}

const mapStateToProps = (state) => {
  const { categories } = state.categories;

  return {
    categories,
  };
};

export default connect(mapStateToProps, actions)(CategoriesContainer);

CategoriesContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};
