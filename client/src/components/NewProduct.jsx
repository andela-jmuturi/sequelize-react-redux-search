import React, { PropTypes } from 'react';
import classnames from 'classnames';

const btnContainerStyles = {
  marginTop: '1em',
};

// Determine what classes to apply to form group divs
// based on whether or not an input field in that div has an error.
const formGroupClasses = (errors, name) => classnames({
  'form-group': true,
  'has-danger': errors && errors[name],
});

// Apply an error class in an input field if it has an error.
const fieldClasses = (errors, name) => classnames({
  'form-control': true,
  'form-control-danger': errors && errors[name],
});

// Render errors. Only render this error in a particular div if it's key
// matches the name of the input field (targetName) in that form group div.
const renderError = (errors, targetName) => {
  if (!errors) {
    return null;
  }

  if (errors[targetName]) {
    return (
      <span className='text-help'>{errors[targetName]}</span>
    );
  }
  return null;
};

// Take an array of error objects and reduce them into one object of errors,
// with the input field names as the keys.
const reduceError = (error) => {
  if (!error) {
    return null;
  }

  if (!Array.isArray(error)) {
    return error;
  }

  const errors = error.reduce((accumulated, err) => {
    Object.keys(err).forEach(key => {
      accumulated[key] = err[key]; // eslint-disable-line no-param-reassign
    });

    return accumulated;
  }, {});

  return errors;
};

const NewProduct = (props) => {
  const errors = reduceError(props.errors ? props.errors.error : null);
  return (
    <div className='card card-block'>
      <h6 className='card-title text-xs-center'>Create a New Product</h6>
      <div className='card-text'>
        <div className={formGroupClasses(errors, 'name')}>
          <label className='form-control-label' htmlFor='name'>
            Product Name
          </label>
          <input
            className={fieldClasses(errors, 'name')}
            id='name'
            name='name'
            onChange={props.onChange}
            type='text'
            value={props.name}
          />
          {renderError(errors, 'name')}
        </div>
        <div className={formGroupClasses(errors, 'description')}>
          <label className='form-control-label' htmlFor='description'>
            Product Description
          </label>
          <input
            className={fieldClasses(errors, 'description')}
            id='description'
            name='description'
            onChange={props.onChange}
            type='text'
            value={props.description}
          />
          {renderError(errors, 'description')}
        </div>
        <div className={formGroupClasses(errors, 'category')}>
          <label className='form-control-label' htmlFor='category'>
            Product Category
          </label>
          <select
            className={`${fieldClasses(errors, 'category')} c-select`}
            id='category'
            name='category'
            onChange={props.onChange}
            value={props.category}
          >
            <option value=''>Select Category</option>
            {props.categories.map(category => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
          {renderError(errors, 'category')}
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
};

export default NewProduct;

NewProduct.propTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleShowCreateProduct: PropTypes.func.isRequired,
};
