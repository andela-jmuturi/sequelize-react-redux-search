import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import CategoriesList from '../components/CategoriesList.jsx';
import NewCategory from '../components/NewCategory.jsx';

class CategoriesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreatingCategory: false,
      name: '',
    };

    this.toggleShowCreateCategory = this.toggleShowCreateCategory.bind(this);
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
      isCreatingCategory: !this.state.isCreatingCategory,
      name: '',
    });
  }

  toggleShowCreateCategory(ev) {
    ev.preventDefault();
    this.setState({
      isCreatingCategory: !this.state.isCreatingCategory,
    });
  }


  render() {
    if (this.state.isCreatingCategory) {
      return (
        <NewCategory
          handleSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          toggleShowCreateCategory={this.toggleShowCreateCategory}
        />
      );
    }
    return (
      <CategoriesList
        categories={this.props.categories}
        toggleShowCreateCategory={this.toggleShowCreateCategory}
      />
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
  createCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};
