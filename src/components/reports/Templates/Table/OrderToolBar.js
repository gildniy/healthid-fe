import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Toolbar, Grid } from '@material-ui/core';
import CustomToolBar from '../../../ordersAndSuppliers/OrderCustomToolBar';
import SelectionToolBar from './SelectionToolBar';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';

export class TableToolBar extends Component {
  state = {
    selected: [],
    isSearchActive: false,
    data: [],
    rows: [],
    isSearching: false,
    order: 'asc',
    orderBy: 'name',
  };


  render() {
    const classes = ToolbarStyles;
    const {
      numSelected,
      handleSearchTextChange,
      title,
      isAdmin,
      handleEdit,
      componentRef,
      handleClickInverseSelection,
      handleClickDeselectAll,
      handleViewOrders,
      client,
      currentPath,
      status,
      popperHeader,
      history,

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
              <Typography
                variant="body1"
                id="tableTitle"
                style={{ fontSize: '1.1em', color: '#424242' }}
              >
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
                client={client}
                history={history}
                status={status}
                popperHeader={popperHeader}
                handleSearchTextChange={handleSearchTextChange}
                handleViewOrders={handleViewOrders}
                currentPath={currentPath}
                classes={classes}
                componentRef={componentRef}
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
  handleSearchTextChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func,
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.string]),
  client: PropTypes.instanceOf(Object).isRequired,
  componentRef: PropTypes.instanceOf(Object).isRequired,
  currentPath: PropTypes.string.isRequired,
  handleViewOrders: PropTypes.func.isRequired,
  popperHeader: PropTypes.string.isRequired,
};

TableToolBar.defaultProps = {
  handleEdit: () => {},
  history: {},
};

export default TableToolBar;
