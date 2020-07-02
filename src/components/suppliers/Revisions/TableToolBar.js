import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Toolbar, Tooltip, IconButton
} from '@material-ui/core';
import { ToolbarStyles } from '../../../assets/styles/stock/stock';
import TableSearch from '../../stock_control/Table/TableSearch';
import searchlogo from '../../../assets/images/products/search.png';

export const TableToolBar = ({
  handleTextChange,
  number,
  isSearchActive,
  handleHideSearch,
  handleClickSearch,
  loading
}) => {
  const classes = ToolbarStyles;

  return (
    <Toolbar>
      <div style={classes.title}>
        <Typography variant="h6" id="tableTitle" style={{ fontWeight: 300 }}>
          {number ? `${number} Versions` : ''}
        </Typography>
      </div>
      <div style={classes.spacer} />
      <div style={classes.actions}>
        {isSearchActive ? (
          <TableSearch
            onHide={handleHideSearch}
            handleTextChange={handleTextChange}
            isSearching={loading}
          />
        ) : (
          ''
        )}
        <Tooltip title="Search">
          <IconButton
            className={!isSearchActive ? classes.iconButtonActive : classes.iconButton}
            toolTip="Search"
            aria-haspopup="true"
            onClick={handleClickSearch}
          >
            <img src={searchlogo} style={{ width: '20px' }} alt="" />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

TableToolBar.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  handleHideSearch: PropTypes.func.isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default TableToolBar;
