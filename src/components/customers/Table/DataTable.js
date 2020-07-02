import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { createFilter } from 'react-search-input';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, TableRow, TablePagination, TableCell, TableBody, Table
} from '@material-ui/core';
import { CUSTOMERS } from '../../../queries/customersQuery';
import TableHeader from './TableHeader';
import TableToolBar from './TableToolBar';
import CustomCheckbox from '../../shared/customCheckbox';
import CustomerDetailDialog from '../../shared/customers/customerDetailDialog';
import { TableStyles } from '../../../assets/styles/stock/stock';
import { getSortedData } from '../utils/utils';

export const DataTable = ({
  classes, columns, data, title, onRowClick, totalCount,
  rowsPerPage, page, handleChangePage, handleChangeRowsPerPage,
  client
}) => {
  const [searchText, setSearchText] = useState('');
  const [prevSearchValue, setPrevSearchValue] = useState('');
  const [order, setOrder] = useState('asc');
  const [rows, setRows] = useState(data);
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);

  const componentRef = React.useRef();

  const handleRequestSort = (_, property) => {
    const isDesc = orderBy === property && order === 'desc';

    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const normalizeData = customers => customers.map(({
    id, firstName, lastName, primaryMobileNumber, email,
    loyaltyPoints
  }) => ({
    id,
    name: `${firstName} ${lastName}`,
    email,
    mobileNumber: primaryMobileNumber,
    loyaltyPoints,
    storeCredit: 0
  }));

  React.useEffect(() => {
    setRows(normalizeData(data));
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

  const handleSearch = () => {
    setPrevSearchValue(searchText);
    const { customers } = client.readQuery({
      query: CUSTOMERS
    });
    const KEYS_TO_FILTER = ['firstName', 'lastName', 'primaryMobileNumber'];
    const filteredCustomers = customers.filter(createFilter(searchText, KEYS_TO_FILTER));
    setRows(normalizeData(filteredCustomers));
  };
  const handleTextChange = (event) => {
    setSearchText(event.target.value);

    if (searchText.length >= 3 && searchText !== prevSearchValue) {
      handleSearch();
    } else {
      setRows(normalizeData(data));
      setPrevSearchValue('');
    }
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

  const handleEditCustomer = () => {

  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <TableToolBar
          name="toolbar"
          title={`${totalCount} ${title}`}
          numSelected={selected.length}
          searchText={searchText}
          handleTextChange={handleTextChange}
          handleClickDeselectAll={handleClickDeselectAll}
          handleEdit={handleEditCustomer}
          handleClickInverseSelection={handleClickInverseSelection}
          componentRef={componentRef}
        />
        <div className={classes.tableWrapper} ref={componentRef}>
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
                    id, name, email, mobileNumber, loyaltyPoints, storeCredit
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
                      <TableCell padding="checkbox" align="center">
                        <CustomCheckbox
                          style={{ marginLeft: '.3rem' }}
                          checked={isItemSelected}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClick(event, id);
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{mobileNumber}</TableCell>
                      <TableCell align="left">{loyaltyPoints}</TableCell>
                      <TableCell align="left">{storeCredit}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
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
      <CustomerDetailDialog />
    </div>
  );
};

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object),
  columns: PropTypes.arrayOf(String),
  data: PropTypes.arrayOf(Object),
  title: PropTypes.string,
  onRowClick: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  client: PropTypes.instanceOf(Object),
};

DataTable.defaultProps = {
  classes: {},
  columns: [],
  data: [],
  title: '',
  totalCount: null,
  rowsPerPage: null,
  page: null,
  client: {},
};

export default withStyles(TableStyles)(withApollo(DataTable));
