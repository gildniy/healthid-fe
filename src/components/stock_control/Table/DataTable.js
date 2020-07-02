import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, TableRow, TablePagination, TableCell, TableBody, Table
} from '@material-ui/core';
import TableHeader from './TableHeader';
import TableToolBar from './TableToolBar';
import CustomCheckbox from '../../shared/customCheckbox';
import { TableStyles } from '../../../assets/styles/stock/stock';
import { getSortedData } from '../utils/utils';
import ProposeEditDialog from '../proposeEditDialog';
import StockActionTypes from '../../../providers/reducers/stock/stockTypes';

import { useStateValue } from '../../../providers/stateProvider';
import DataTableLoader from '../../dataTable/dataTableLoader';

export const DataTable = ({
  classes, columns, data, title, onRowClick, isAdmin, totalCount, handleSearch,
  rowsPerPage, page, handleChangePage, handleChangeRowsPerPage,
  isSearching, state
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelections = rows.map(product => product.id);
      setSelected(newSelections);
      return;
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

  const onEditQuantity = () => {
    dispatch({
      type: StockActionTypes.TOGGLE_DIALOG
    });
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const selectedRow = rows.filter(word => word.id === selected[0])[0];
  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <TableToolBar
          name="toolbar"
          isAdmin={isAdmin}
          title={`${totalCount} ${title}`}
          numSelected={selected.length}
          handleTextChange={handleSearch}
          handleClickDeselectAll={handleClickDeselectAll}
          handleEdit={onEditQuantity}
          handleClickInverseSelection={handleClickInverseSelection}
          state={state}
        />
        { isSearching ? (
          <DataTableLoader />
        ) : (
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
                      id, name, sku, dispensingSize, quantity
                    } = row;
                    return (
                      <TableRow
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={id}
                        selected={isItemSelected}
                        onClick={() => {
                          onRowClick(id);
                        }}
                      >
                        <TableCell
                          padding="checkbox"
                          align="center"
                        >
                          <CustomCheckbox
                            style={{ marginLeft: '1.2rem' }}
                            checked={isItemSelected}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleClick(event, id);
                            }}
                          />
                        </TableCell>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">
                          <span className={classes.name}>
                            {name}
                          </span>
                        </TableCell>
                        <TableCell align="left">{sku}</TableCell>
                        <TableCell align="left">{dispensingSize}</TableCell>
                        <TableCell align="left">{quantity}</TableCell>
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
      <ProposeEditDialog
        data={selectedRow}
        handleClickDeselectAll={handleClickDeselectAll}
      />
    </div>
  );
};

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  columns: PropTypes.arrayOf(String).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default withStyles(TableStyles)(DataTable);
