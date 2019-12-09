import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ movie, actor, id }) => {
  return (
    <div className="rmdb-navigation">
      <div className="rmdb-navigation-content">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>/</p>
        <Link to={`/${id}`}>{movie ? <p>{movie}</p> : <p>...</p>}</Link>
        {actor && (
          <>
            <p>/</p>
            <p>{actor}</p>
          </>
        )}
      </div>
    </div>
  );
};

Navigation.propTypes = {
  movie: PropTypes.string.isRequired,
};
export default Navigation;
