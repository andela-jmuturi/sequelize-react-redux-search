import React, { PropTypes } from 'react';
import classnames from 'classnames';

const btnContainerStyles = {
  marginTop: '1em',
};

const inputFieldClasses = (errors) => classnames({
  'form-control': true,
  'form-control-danger': !!errors,
});

const formGroupClasses = (errors) => classnames({
  'form-group': true,
  'has-danger': !!errors,
});

const renderError = (error) => Object
  .keys(error)
  .map(key => (
    <span className='text-help' key={key}>{error[key]}</span>
  ));

const NewCategory = (props) => (
  <div className='card card-block'>
    <h6 className='card-title text-xs-center'>Create a New Category</h6>
    <div className='card-text'>
      <div className={formGroupClasses(props.errors)}>
        <label className='form-control-label' htmlFor='name'>
          Category Name
        </label>
        <input
          className={inputFieldClasses(props.errors)}
          defaultValue={props.name}
          id='name'
          name='name'
          onChange={props.onChange}
          type='text'
          required
        />
        {props.errors && Array.isArray(props.errors.error)
          ? props.errors.error.map(renderError)
          : props.errors && (
            <span className='text-help'>{props.errors.error.message}</span>
          )
        }
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
            onClick={props.toggleShowCreateCategory}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default NewCategory;

NewCategory.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ]),
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleShowCreateCategory: PropTypes.func.isRequired,
};
