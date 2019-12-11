import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './FourColGrid.css';

const FourColGrid = ({ children, header, loading, clearItems }) => {
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
      <div className="rmdb-header-grid">
        {header && !loading ? (
          <h1>
            {header}
            {header && header === 'Search Results' ? (
              <FontAwesome
                className="rmdb-fa-trash"
                name="trash"
                size="2x"
                onClick={clearItems}
              />
            ) : null}
          </h1>
        ) : null}
      </div>
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
