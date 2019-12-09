import React from 'react';
import Youtube from 'react-youtube-embed';
import PropTypes from 'prop-types';
import './MovieTrailers.css';

const MovieTrailers = ({ trailers }) => {
  return (
    <div className="rmdb-movietrailer">
      <div className="rmdb-movietrailer-content">
        {trailers[0] && (
          <div className="rmdb-movietrailer-content-col">
            <Youtube id={trailers[0] && trailers[0].trailer} />
          </div>
        )}

        {trailers[1] && (
          <div className="rmdb-movietrailer-content-col">
            <Youtube id={trailers[1] && trailers[1].trailer} />
          </div>
        )}

        {trailers[2] && (
          <div className="rmdb-movietrailer-content-col">
            <Youtube id={trailers[2] && trailers[2].trailer} />
          </div>
        )}
      </div>
    </div>
  );
};

MovieTrailers.propTypes = {
  trailers: PropTypes.array.isRequired,
};
export default MovieTrailers;
