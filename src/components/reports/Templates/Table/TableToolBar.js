import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, Typography, Toolbar } from '@material-ui/core';
import CustomToolBar from './CustomToolBar';
import SelectionToolBar from './SelectionToolBar';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';

export class TableToolBar extends Component {
  state = {
    selected: [],
    hoverdItem: undefined,
    x: 0,
    y: 0,
    data: [],
    rows: [],
    isSearching: false,
    order: 'asc',
    orderBy: 'name',
  };

  isSelected = (name) => {
    const { selected } = this.state;
    return selected.indexOf(name) !== -1;
  };

  render() {
    const classes = ToolbarStyles;
    const {
      numSelected,
      handleTextChange,
      title,
      isAdmin,
      handleEdit,
      rows,
      componentRef,
      handleClickInverseSelection,
      handleClickDeselectAll,
      handleViewProposed,
      status,
      currentPath,
      hiddenColumns,
      handleChangeColumn,
      handleSearch,
      state
    } = this.props;

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
                name="toolbar"
                isAdmin={isAdmin}
                title={`${title}`}
                rows={rows}
                handleTextChange={handleTextChange}
                handleViewProposed={handleViewProposed}
                currentPath={currentPath}
                status={status}
                componentRef={componentRef}
                hiddenColumns={hiddenColumns}
                handleChangeColumn={handleChangeColumn}
                handleSearchTextChange={handleSearch}
                state={state}
              />
            )}
          </Grid>
        </Grid>
      </Toolbar>
    );
  }
}

TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  rows: PropTypes.instanceOf(Object).isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  handleEdit: PropTypes.func,
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  componentRef: PropTypes.instanceOf(Object).isRequired,
  currentPath: PropTypes.string.isRequired,
  handleChangeColumn: PropTypes.func.isRequired,
  hiddenColumns: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,

};

TableToolBar.defaultProps = {
  handleEdit: () => {}
};

export default TableToolBar;
