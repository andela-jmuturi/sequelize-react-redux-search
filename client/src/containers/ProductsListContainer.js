import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductsList from '../components/ProductsList.jsx';
import NewProduct from '../components/NewProduct.jsx';
import * as actions from '../actions';

class ProductListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreatingProduct: false,
      name: '',
      description: '',
      category: 'any',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchProductsList();
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    const { name, description, category } = this.state;
    this.props
      .createProduct({ name, description, category })
      .then(() => {
        this.setState({
          name: '',
          description: '',
          category: '',
        });
      })
      .catch(() => {
        // Ignore the error from Promise.reject() in this action.
      });
  }

  render() {
    if (this.props.isCreatingProduct) {
      return (
        <NewProduct
          categories={this.props.categories}
          category={this.state.category}
          description={this.state.description}
          errors={this.props.errors}
          handleSubmit={this.handleSubmit}
          name={this.state.name}
          onChange={this.handleInputChange}
          toggleShowCreateProduct={this.props.toggleShowCreateProduct}
        />
      );
    }
    return (
      <ProductsList
        products={this.props.products}
        toggleShowCreateProduct={this.props.toggleShowCreateProduct}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { products, isCreatingProduct, errors } = state.productsList;
  const { categories } = state.categories;

  return {
    categories,
    errors,
    isCreatingProduct,
    products,
  };
};

export default connect(mapStateToProps, actions)(ProductListContainer);

ProductListContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  createProduct: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  fetchProductsList: PropTypes.func.isRequired,
  isCreatingProduct: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  toggleShowCreateProduct: PropTypes.func.isRequired,
};
