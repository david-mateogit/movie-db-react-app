import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { calcTime, convertMoney } from '../../../helpers';
import './MovieInfoBar.css';

const MovieInfoBar = ({ movie: { runtime, budget, revenue } }) => {
  return (
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <FontAwesome
            className="fa-time rmdb-movieinfobar-icon"
            name="clock-o"
            size="2x"
          />
          <span className="rmdb-movieinfobar-info">
            Running time: {calcTime(runtime)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <FontAwesome
            className="fa-budget rmdb-movieinfobar-icon"
            name="money"
            size="2x"
          />
          <span className="rmdb-movieinfobar-info">
            Budget: {convertMoney(budget)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <FontAwesome
            className="fa-revenue rmdb-movieinfobar-icon"
            name="ticket"
            size="2x"
          />
          <span className="rmdb-movieinfobar-info">
            Revenue: {convertMoney(revenue)}
          </span>
        </div>
      </div>
    </div>
  );
};

MovieInfoBar.propTypes = {
  movie: PropTypes.shape({
    runtime: PropTypes.number.isRequired,
    budget: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
  }).isRequired,
};
export default MovieInfoBar;
