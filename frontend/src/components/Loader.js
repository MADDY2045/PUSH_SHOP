import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        display: 'block',
        margin: 'auto',
        height: '100px',
      }}
    >
      <span className="sr-only">Loading....</span>
    </Spinner>
  );
};

export default Loader;
