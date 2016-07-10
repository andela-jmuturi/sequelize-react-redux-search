import React, { PropTypes } from 'react';

const btnContainerStyles = {
  marginTop: '1em',
};

const NewProduct = (props) => (
  <div className='card card-block'>
    <h6 className='card-title text-xs-center'>Create a New Product</h6>
    <div className='card-text'>
      <div className='form-group'>
        <label htmlFor='name'>Product Name</label>
        <input
          className='form-control'
          id='name'
          name='name'
          onChange={props.onChange}
          type='text'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Product Description</label>
        <input
          className='form-control'
          id='description'
          name='description'
          onChange={props.onChange}
          type='text'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='category'>Product Category</label>
        <select
          className='form-control c-select'
          id='category'
          name='category'
          onChange={props.onChange}
        >
          <option value=''>Select Category</option>
          {props.categories.map(category => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className='row' style={btnContainerStyles}>
        <div className='col-xs-6'>
          <button
            className='btn btn-sm btn-primary-outline'
            onClick={props.handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className='col-xs-6 text-xs-right'>
          <button
            className='btn btn-sm btn-danger-outline'
            onClick={props.toggleShowCreateProduct}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default NewProduct;

NewProduct.propTypes = {
  categories: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleShowCreateProduct: PropTypes.func.isRequired,
};
