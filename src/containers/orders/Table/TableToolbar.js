import React from 'react';
import PropTypes, { object } from 'prop-types';
import {
  Typography, Toolbar, Grid, withStyles
} from '@material-ui/core';
import clsx from 'clsx';
import { ToolBarStyles } from '../../../assets/styles/orders/order';
import CustomToolBar from './CustomToolBar';

export const TableToolBar = (props) => {
  const {
    numSelected,
    selected,
    selectedRow,
    handleTextChange,
    isSearchActive,
    handleHideSearch,
    handleClickSearch,
    handleEdit,
    handleOpenModal,
    handleCloseModal,
    displayModal,
    handleQuantitySupplierEdit,
    deselect,
    productsAmount,
    searchDataValues,
    orderId,
    classes
  } = props;

  return (
    <Toolbar className={clsx(classes.selection, {
      'tool-bar-elevation': numSelected > 0
    })}
    >
      <Grid container justify="space-between">
        <Grid item xs={4} className={classes.title}>
          {numSelected > 0 ? (
            <Typography>
              {`${numSelected} Row(s) selected`}
            </Typography>
          ) : (
            <Typography id="tableTitle">
              {`${productsAmount} Product(s)`}
            </Typography>
          )}
        </Grid>
        <Grid item container xs={8} alignItems="flex-start" justify="flex-end">
          <CustomToolBar
            handleClickSearch={handleClickSearch}
            isSearchActive={isSearchActive}
            handleHideSearch={handleHideSearch}
            handleTextChange={handleTextChange}
            handleEdit={handleEdit}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            open={displayModal}
            numSelected={numSelected}
            selectedRow={selectedRow}
            handleQuantitySupplierEdit={handleQuantitySupplierEdit}
            deselect={deselect}
            selected={selected}
            searchDataValues={searchDataValues}
            orderId={orderId}
          />
        </Grid>
      </Grid>

    </Toolbar>
  );
};

TableToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  numSelected: PropTypes.number.isRequired,
  selectedRow: PropTypes.instanceOf(object).isRequired,
  handleTextChange: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  handleHideSearch: PropTypes.func.isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  searchDataValues: PropTypes.func.isRequired,
  displayModal: PropTypes.bool.isRequired,
  handleQuantitySupplierEdit: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
  productsAmount: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(Number).isRequired,
  orderId: PropTypes.string.isRequired,
};

export default withStyles(ToolBarStyles)(TableToolBar);
