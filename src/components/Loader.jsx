import React from 'react';
import './Loader.scss';

const Loader = () => (
  <div className="simple-loader" role="status" aria-live="polite">
    <span className="simple-loader__spinner" />
  </div>
);

export default Loader;