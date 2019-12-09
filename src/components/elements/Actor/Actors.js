import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../../config';
import './Actors.css';

const Actors = ({
  actor: { name, id, character, profile_path },
  clickable,
  movie,
}) => {
  const POSTER_SIZE = 'w154';

  return (
    <div className="rmdb-actor">
      {clickable ? (
        <Link
          to={{
            pathname: `/${movie.id}/actor/${id}`,
            movieName: `${movie.title}`,
          }}
        >
          <img
            src={
              profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`
                : './images/no_image.jpg'
            }
            alt={name}
          />
        </Link>
      ) : (
        <img
          src={
            profile_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`
              : './images/no_image.jpg'
          }
          alt={name}
        />
      )}
      <span className="rmdb-actor-name">{name}</span>
      <span className="rmdb-actor-character">{character}</span>
    </div>
  );
};

Actors.propTypes = {
  actor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    profile_path: PropTypes.string,
  }).isRequired,
};
export default Actors;
