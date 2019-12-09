import React from 'react';
import PropTypes from 'prop-types';
import './ActorThumb.css';

const ActorThumb = ({ image }) => {
  return (
    <div className="rmdb-actorthumb">
      <img src={image} alt="actorthumb" />
    </div>
  );
};

ActorThumb.propTypes = {
  image: PropTypes.string.isRequired,
};
export default ActorThumb;
