import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

const SearchBar = ({ searchItems, clearItems, searchTerm }) => {
  const [value, setValue] = useState(searchTerm);

  const handleSubmit = e => {
    e.preventDefault();
    setValue(value.trim());
    if (value.trim() === '') return;
    searchItems(value);
  };

  const doSearch = val => {
    setValue(val);
  };
  const doClear = () => {
    setValue('');
    clearItems();
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
            value={searchTerm || value}
            autoComplete="off"
            required
          />
        </form>
        <FontAwesome
          className="rmdb-fa-trash"
          name="trash"
          size="2x"
          onClick={doClear}
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchItems: PropTypes.func.isRequired,
  clearItems: PropTypes.func.isRequired,
};
export default SearchBar;
