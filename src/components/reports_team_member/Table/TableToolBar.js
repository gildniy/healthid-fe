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
    handleTextChange,
    title,
    isAdmin,
    handleClickInverseSelection,
    handleClickDeselectAll,
    state,
    componentRef
  } = props;

  return (
    <Toolbar
      className={clsx({ 'tool-bar-elevation': numSelected > 0 },
        `${numSelected > 0 && 'tool-bar__main'}`)}
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
              isAdmin={isAdmin}
            />
          ) : (
            <CustomToolBar
              handleTextChange={handleTextChange}
              state={state}
              componentRef={componentRef}
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
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
};

export default TableToolBar;
