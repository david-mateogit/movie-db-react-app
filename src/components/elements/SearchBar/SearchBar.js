import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

const SearchBar = ({ searchItems }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setValue(value.trim());
    if (value.trim() === '') return;
    searchItems(false, value);
    setValue('');
  };

  const doSearch = val => {
    setValue(val);
  };

  return (
    <div className="rmdb-searchbar">
      <div className="rmdb-searchbar-content">
        <form
          onSubmit={e => {
            return handleSubmit(e);
          }}
        >
          <button
            type="submit"
            onClick={e => {
              return handleSubmit(e);
            }}
          >
            <FontAwesome className="rmdb-fa-search" name="search" size="3x" />
          </button>
          <input
            type="text"
            className="rmdb-searchbar-input"
            name="search"
            placeholder="Search"
            onChange={e => {
              return doSearch(e.target.value);
            }}
            value={value}
            autoComplete="off"
            required
          />
        </form>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchItems: PropTypes.func.isRequired,
};
export default SearchBar;
