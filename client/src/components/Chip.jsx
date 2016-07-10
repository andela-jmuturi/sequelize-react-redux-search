import React from 'react';

const chipStyles = {
  display: 'inline-block',
  padding: '0 0.8rem',
  marginRight: '.25rem',
  fontSize: '0.8rem',
  lineHeight: '1.4rem',
  color: '#757575',
  backgroundColor: '#eee',
  borderRadius: '3rem',
};

const Chip = ({ children }) => ( // eslint-disable-line
  <span style={chipStyles}>{children}</span>
);

export default Chip;
