import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const SearchComponent = ({ onSearch }) => {
  return (
    <Input.Search
      placeholder="Search Pokémon"
      onSearch={onSearch}
      style={{ marginBottom: 20 }}
    />
  );
};

SearchComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchComponent;