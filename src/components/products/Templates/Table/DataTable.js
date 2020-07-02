import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, TableRow, TablePagination,
  TableCell, TableBody, Table
} from '@material-ui/core';
import TableHeader from './TableHeader';
import TableToolBar from './TableToolBar';
import CustomCheckbox from '../../../shared/customCheckbox';
import { TableStyles } from '../../../../assets/styles/stock/stock';
import { getSortedData } from '../../../stock_control/utils/utils';
import PricingActionTypes from '../../../../providers/reducers/pricingLoyalty/pricingTypes';
import { useStateValue } from '../../../../providers/stateProvider';
import DataTableLoader from '../../../dataTable/dataTableLoader';

export const DataTable = ({
  classes, columns, data, title, onRowClick, isAdmin, totalCount, isSearching,
  rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, handleSearch, state,
  currentPath, handleViewProposed
}) => {
  const [order, setOrder] = useState('asc');
  const [rows, setRows] = useState(data);
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);

  const [, dispatch] = Object.values(useStateValue());

  const handleRequestSort = (_, property) => {
    const isDesc = orderBy === property && order === 'desc';

    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  React.useEffect(() => {
    dispatch({
      type: PricingActionTypes.SET_SELECTED,
      payload: selected
    });
  }, [selected]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelections = rows.map(product => product.id);
      return setSelected(newSelections);
    }
    setSelected([]);
  };

  const handleClick = (_, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    dispatch({
      type: PricingActionTypes.SET_DATA,
      payload: rows
    });
  };

  const handleClickInverseSelection = () => {
    const newSelected = [];

    rows.forEach((row) => {
      if (!selected.find(selectedId => selectedId === row.id)) {
        newSelected.push(row.id);
      }
    });
    setSelected(newSelected);
  };

  const handleClickDeselectAll = () => {
    setSelected([]);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div>
      <Paper elevation={2} square className={classes.paper}>
        <TableToolBar
          name="toolbar"
          isAdmin={isAdmin}
          title={`${title}`}
          numSelected={selected.length}
          handleClickDeselectAll={handleClickDeselectAll}
          handleClickInverseSelection={handleClickInverseSelection}
          currentPath={currentPath}
          handleViewProposed={handleViewProposed}
          handleSearch={handleSearch}
          state={state}
        />
        {
          isSearching ? (<DataTableLoader />)
            : (
              <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHeader
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headRows={columns}
                  />
                  <TableBody>
                    {getSortedData(rows, page, rowsPerPage, order, orderBy)
                      .map((row) => {
                        const isItemSelected = isSelected(row.id);
                        const {
                          id, productName, skuNumber, salesPrice, productCategory,
                          loyaltyWeight, vatStatus, dispensingSize, brand, manufacturer,
                          reorderPoint, reorderMax, preferredSupplier, backupSupplier,
                          nearestExpiryDate, quantityInStock, globalUpc
                        } = row;
                        return (
                          <TableRow
                            className={classes.tableRow}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={id}
                            selected={isItemSelected}
                            onClick={() => {
                              onRowClick(id);
                            }}
                          >
                            <TableCell padding="checkbox" align="center">
                              <CustomCheckbox
                                checked={isItemSelected}
                                style={{ marginLeft: '1.2rem' }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleClick(event, id);
                                }}
                              />
                            </TableCell>
                            <TableCell align="left">
                              <span className={classes.name}>
                                {productName}
                              </span>
                            </TableCell>
                            <TableCell align="left">{skuNumber}</TableCell>
                            <TableCell align="left">
                              <span className={classes.globalUpc}>
                                {globalUpc}
                              </span>
                            </TableCell>
                            <TableCell align="left">
                              <span className={classes.name}>
                                {productCategory}
                              </span>
                            </TableCell>
                            <TableCell align="left">
                              <span className={classes.name}>
                                {dispensingSize}
                              </span>
                            </TableCell>
                            <TableCell align="left">{brand}</TableCell>
                            <TableCell align="left">{manufacturer}</TableCell>
                            <TableCell align="left">{quantityInStock}</TableCell>
                            <TableCell align="left">{salesPrice}</TableCell>
                            <TableCell align="left">{reorderPoint}</TableCell>
                            <TableCell align="left">{reorderMax}</TableCell>
                            <TableCell align="left">{loyaltyWeight}</TableCell>
                            <TableCell align="left">{preferredSupplier}</TableCell>
                            <TableCell align="left">{backupSupplier}</TableCell>
                            <TableCell align="left">{nearestExpiryDate}</TableCell>
                            <TableCell align="left">{vatStatus}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            )}
        <TablePagination
          rowsPerPageOptions={[50, 100, 250, 500]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  columns: PropTypes.arrayOf(String).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  state: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default withStyles(TableStyles)(DataTable);
