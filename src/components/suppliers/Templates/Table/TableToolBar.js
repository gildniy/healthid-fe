import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Toolbar, Grid } from '@material-ui/core';
import CustomToolBar from './CustomToolBar';
import SelectionToolBar from './SelectionToolBar';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';

export const TableToolBar = (props) => {
  const classes = ToolbarStyles;
  const {
    numSelected,
    handleTextChange,
    searchText,
    title,
    isAdmin,
    handleEdit,
    handleClickInverseSelection,
    handleClickDeselectAll,
    handleViewProposed,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.selection, {
        'tool-bar-elevation': numSelected > 0
      })}
    >
      <Grid container justify="space-between">
        <Grid item xs={4} style={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {`${numSelected} row(s) selected`}
            </Typography>
          ) : (
            <Typography variant="body1" id="tableTitle">
              {title}
            </Typography>
          )}
        </Grid>
        <Grid item container xs={8} alignItems="flex-start" justify="flex-end">
          {numSelected > 0 ? (
            <SelectionToolBar
              handleClickInverseSelection={handleClickInverseSelection}
              handleClickDeselectAll={handleClickDeselectAll}
              handleEdit={handleEdit}
              selected={numSelected}
            />
          ) : (
            <CustomToolBar
              isAdmin={isAdmin}
              searchText={searchText}
              handleTextChange={handleTextChange}
              handleViewProposed={handleViewProposed}
            />
          )}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func,
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
  searchText: PropTypes.string,
};

TableToolBar.defaultProps = {
  handleEdit: () => {},
  searchText: ''
};

export default TableToolBar;
