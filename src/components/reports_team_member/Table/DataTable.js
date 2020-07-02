import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, TableRow, TablePagination, TableCell,
  TableBody, Table
} from '@material-ui/core';
import TableHeader from './TableHeader';
import TableToolBar from './TableToolBar';
import CustomCheckbox from '../../shared/customCheckbox';
import { TableStyles } from '../../../assets/styles/stock/stock';
import { getSortedData } from '../../stock_control/utils/utils';
import PricingActionTypes from '../../../providers/reducers/pricingLoyalty/pricingTypes';
import { useStateValue } from '../../../providers/stateProvider';
import DataTableLoader from '../../dataTable/dataTableLoader';

export const DataTable = ({
  classes, columns, data, title, onRowClick, isAdmin, totalCount, handleSearch,
  rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, isSearching, state, ref
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

  const componentRef = React.createRef();

  return (
    <div>
      <Paper elevation={2} square className={classes.paper}>
        <TableToolBar
          name="toolbar"
          isAdmin={isAdmin}
          title={`${totalCount} ${title}`}
          numSelected={selected.length}
          state={state}
          componentRef={componentRef}
        />
        {isSearching ? (
          <DataTableLoader />
        ) : (
          <div className={classes.tableWrapper} ref={componentRef}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableHeader
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headRows={columns}
              />
              <TableBody>
                {getSortedData(rows, page, rowsPerPage, order, orderBy)
                  .map((row) => {
                    const {
                      sale: {
                        salesPerson: {
                          email,
                          role
                        }
                      },
                      totalQtySold,
                      totalProductsSold,
                      totalCashAmount,
                      totalCardAmount
                    } = row;

                    return (
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        key={email}
                      >
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{role.name}</TableCell>
                        <TableCell align="left">{totalProductsSold}</TableCell>
                        <TableCell align="left">{totalQtySold}</TableCell>
                        <TableCell align="left">{totalCashAmount}</TableCell>
                        <TableCell align="left">{totalCardAmount}</TableCell>
                        <TableCell align="left">{parseInt(totalCashAmount) + parseInt(totalCardAmount)}</TableCell> 
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        )
        }
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
  // onRowClick: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired
};

export default withStyles(TableStyles)(DataTable);
