import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Toolbar, Grid } from '@material-ui/core';

import CustomToolBar from './CustomToolBar';
import SelectionToolBar from './SelectionToolBar';
import { ToolbarStyles } from '../../../assets/styles/stock/stock';

export const TableToolBar = (props) => {
  const classes = ToolbarStyles;
  const {
    numSelected,
    searchText,
    handleTextChange,
    componentRef,
    title,
    handleEdit,
    handleClickInverseSelection,
    handleClickDeselectAll
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
            <Typography variant="subtitle1" id="tableTitle">
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
              searchText={searchText}
              handleTextChange={handleTextChange}
              componentRef={componentRef}
              title={title}
            />
          )}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

TableToolBar.propTypes = {
  numSelected: PropTypes.number,
  searchText: PropTypes.string,
  handleTextChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  handleEdit: PropTypes.func.isRequired,
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
  componentRef: PropTypes.instanceOf(Object),
};

TableToolBar.defaultProps = {
  numSelected: null,
  searchText: '',
  title: '',
  componentRef: {},
};

export default TableToolBar;
