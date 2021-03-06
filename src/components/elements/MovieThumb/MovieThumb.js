import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MovieThumb.css';

const MovieThumb = ({ image, clickable, movieId, movieName }) => {
  return (
    <div
      className={clickable ? 'rmdb-moviethumb-movie' : 'rmdb-moviethumb-solo'}
    >
      {clickable ? (
        <Link to={{ pathname: `/${movieId}`, movieName: `${movieName}` }}>
          <img src={image} alt="moviethumb" />
        </Link>
      ) : (
        <img src={image} alt="moviethumb" />
      )}
    </div>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.string.isRequired,
  clickable: PropTypes.bool,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
};
export default MovieThumb;
