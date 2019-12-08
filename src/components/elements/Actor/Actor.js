import React from 'react';
import PropTypes from 'prop-types';
import { IMAGE_BASE_URL } from '../../../config';
import './Actor.css';

const Actor = ({ actor: { name, character, profile_path } }) => {
  const POSTER_SIZE = 'w154';

  return (
    <div className="rmdb-actor">
      <img
        src={
          profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`
            : './images/no_image.jpg'
        }
        alt={name}
      />
      <span className="rmdb-actor-name">{name}</span>
      <span className="rmdb-actor-character">{character}</span>
    </div>
  );
};

Actor.propTypes = {
  actor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    profile_path: PropTypes.string,
  }).isRequired,
};
export default Actor;
