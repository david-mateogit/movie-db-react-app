import React from 'react';
import Youtube from 'react-youtube-embed';
import PropTypes from 'prop-types';
import './MovieTrailers.css';

const MovieTrailers = ({ trailers }) => {
  return (
    <div className="rmdb-movietrailer">
      <div className="rmdb-movietrailer-content">
        <div className="rmdb-movietrailer-content-col">
          {trailers[0] && <Youtube id={trailers[0] && trailers[0].trailer} />}
          <span className="rmdb-movietrailer-info" />
        </div>
        <div className="rmdb-movietrailer-content-col">
          {trailers[1] && <Youtube id={trailers[1] && trailers[1].trailer} />}
          <span className="rmdb-movietrailer-info" />
        </div>
        <div className="rmdb-movietrailer-content-col">
          {trailers[2] && <Youtube id={trailers[2] && trailers[2].trailer} />}
          <span className="rmdb-movietrailer-info" />
        </div>
      </div>
    </div>
  );
};

// MovieTrailers.propTypes = {
//   movie: PropTypes.shape({
//     runtime: PropTypes.number.isRequired,
//     budget: PropTypes.number.isRequired,
//     revenue: PropTypes.number.isRequired,
//   }).isRequired,
// };
export default MovieTrailers;
