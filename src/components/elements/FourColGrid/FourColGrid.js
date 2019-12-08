import React from 'react';
import PropTypes from 'prop-types';
import './FourColGrid.css';

const FourColGrid = ({ children, header, loading }) => {
  const renderElements = () => {
    const gridElements = children.map((element, i) => {
      return (
        <div key={i} className="rm\db-grid-element">
          {element}
        </div>
      );
    });
    return gridElements;
  };
  return (
    <div className="rmdb-grid">
      {header && !loading ? <h1>{header}</h1> : null}
      <div className="rmdb-grid-content">{renderElements()}</div>
    </div>
  );
};

FourColGrid.propTypes = {
  children: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default FourColGrid;
