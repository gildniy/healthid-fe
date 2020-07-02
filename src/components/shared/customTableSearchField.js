import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import searchIcon from '../../assets/images/stock/search.png';
import '../../assets/styles/shared/customTableSearchField.scss';

export const CustomTableSearchField = ({
  handleChange, searchText, styles, disabled
}) => {
  const focus = () => {
    setTimeout(() => {
      document.getElementById('auto-focus').focus();
    }, 500);
  };
  return (
    <div className="table__container">
      <div className="table-search__container">
        <input
          type="text"
          id="auto-focus"
          name="tableSearch"
          value={searchText}
          placeholder="Search"
          onChange={handleChange}
          disabled={disabled}
          className="table-search__input"
        />
        <IconButton
          onClick={focus}
          className="table-search__button"
        >
          <img src={searchIcon} style={styles.searchIcon} alt="search" />
        </IconButton>
      </div>
    </div>
  );
};

CustomTableSearchField.propTypes = {
  searchText: PropTypes.string,
  styles: PropTypes.instanceOf(Object),
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

CustomTableSearchField.defaultProps = {
  searchText: '',
  styles: {},
  disabled: false
};

export default CustomTableSearchField;
