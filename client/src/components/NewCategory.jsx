import React, { PropTypes } from 'react';

const btnContainerStyles = {
  marginTop: '1em',
};

const NewCategory = (props) => (
  <div className='card card-block'>
    <h6 className='card-title text-xs-center'>Create a New Category</h6>
    <div className='card-text'>
      <div className='form-group'>
        <label htmlFor='name'>Category Name</label>
        <input
          className='form-control'
          id='name'
          name='name'
          onChange={props.onChange}
          type='text'
          required
        />
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
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleShowCreateCategory: PropTypes.func.isRequired,
};
