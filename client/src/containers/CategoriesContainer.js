import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import CategoriesList from '../components/CategoriesList.jsx';
import NewCategory from '../components/NewCategory.jsx';

class CategoriesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value.trim(),
    });
  }

  handleSubmit() {
    const { name } = this.state;
    this.props.createCategory({ name });
    this.setState({
      name: '',
    });
  }

  render() {
    if (this.props.isCreatingCategory) {
      return (
        <NewCategory
          errors={this.props.errors}
          handleSubmit={this.handleSubmit}
          name={this.state.name}
          onChange={this.handleInputChange}
          toggleShowCreateCategory={this.props.toggleShowCreateCategory}
        />
      );
    }
    return (
      <CategoriesList
        categories={this.props.categories}
        toggleShowCreateCategory={this.props.toggleShowCreateCategory}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, isCreatingCategory, errors } = state.categories;

  return {
    categories,
    errors,
    isCreatingCategory,
  };
};

export default connect(mapStateToProps, actions)(CategoriesContainer);

CategoriesContainer.propTypes = {
  createCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ]),
  isCreatingCategory: PropTypes.bool.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  toggleShowCreateCategory: PropTypes.func.isRequired,
};
