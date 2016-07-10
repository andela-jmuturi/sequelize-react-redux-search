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
    };

    this.toggleShowCreateProduct = this.toggleShowCreateProduct.bind(this);
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
    this.props.createProduct({ name, description, category });
    this.setState({
      isCreatingProduct: !this.state.isCreatingProduct,
      name: '',
      description: '',
    });
  }

  toggleShowCreateProduct(ev) {
    ev.preventDefault();
    this.setState({
      isCreatingProduct: !this.state.isCreatingProduct,
    });
  }

  render() {
    if (this.state.isCreatingProduct) {
      return (
        <NewProduct
          categories={this.props.categories}
          handleSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          toggleShowCreateProduct={this.toggleShowCreateProduct}
        />
      );
    }
    return (
      <ProductsList
        products={this.props.products}
        toggleShowCreateProduct={this.toggleShowCreateProduct}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state.productsList;
  const { categories } = state.categories;

  return {
    categories,
    products,
  };
};

export default connect(mapStateToProps, actions)(ProductListContainer);

ProductListContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  createProduct: PropTypes.func.isRequired,
  fetchProductsList: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};
