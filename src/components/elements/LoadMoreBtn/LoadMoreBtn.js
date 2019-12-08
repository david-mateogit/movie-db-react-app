import React from 'react';
import PropTypes from 'prop-types';
import './LoadMoreBtn.css';

const LoadMoreBtn = ({ loadMoreItems, text }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="rmdb-loadmorebtn"
      onClick={loadMoreItems}
      onKeyPress={loadMoreItems}
    >
      <p>{text}</p>
    </div>
  );
};

LoadMoreBtn.propTypes = {
  loadMoreItems: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default LoadMoreBtn;
