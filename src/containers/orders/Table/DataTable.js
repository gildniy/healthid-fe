import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createFilter } from 'react-search-input';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MenuItem from '@material-ui/core/MenuItem';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { compose, graphql } from 'react-apollo';
import { Select } from '@material-ui/core';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import { TableStyles } from '../../../assets/styles/stock/stock';
import CustomCheckbox from '../../../components/shared/customCheckbox';
import notify from '../../../components/shared/Toaster';
import UPDATE_PRODUCT_BATCH from '../../../mutations/updateProductBatch';

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => (order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy));

export const DataTable = ({
  columnHeaders, data, orderId, updateQuantityAndSupplier, classes
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [products, setProducts] = useState(data);
  const [initialProducts, setInitialProducts] = useState(data);

  const initialDataSet = (dataArray) => {
    const prods = dataArray.map((item) => {
      const {
        id: preferredSupplierId, name: preferredSupplierName
      } = item.preferredSupplier || null;
      return ({
        id: item.id,
        name: item.product.productName,
        qtyInStock: item.product.quantityInStock,
        sku: item.product.skuNumber,
        quantity: item.quantity,
        currentSupplierId: item.supplier ? item.supplier.id : preferredSupplierId,
        currentSupplierName: item.supplier ? item.supplier.name : preferredSupplierName,
        preferredSupplierId,
        preferredSupplierName,
        backupSupplierId: item.backupSupplier ? item.backupSupplier.id : null,
        backupSupplierName: item.backupSupplier ? item.backupSupplier.name : null,
        unitPrice: item.unitCost,
        totalPrice: item.quantity * item.unitCost
      });
    });
    setProducts(prods);
    setInitialProducts(prods);
  };

  useEffect(() => {
    if (data) initialDataSet(data);
  }, [data]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const searchDataValues = (value) => {
    const KEYS_TO_FILTER = ['name', 'currentSupplierName'];
    if (value) {
      const searchedProducts = initialProducts.filter(createFilter(value, KEYS_TO_FILTER));
      setProducts(searchedProducts);
    } else initialDataSet(data);
  };

  const handleClick = (id) => {
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
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleHideSearch = () => {
    setIsSearchActive(false);
  };

  const handleQuantityChange = id => (event) => {
    const newData = [...products];
    newData.map((product) => {
      if (product.id === id) {
        product.quantity = parseInt(event.target.value, 10) || 0;
      }
      return product;
    });
    setProducts(newData);
  };

  const handleSupplierChange = id => (event) => {
    const newData = [...products];
    newData.map((product) => {
      if (product.id === id) {
        product.currentSupplierId = event.target.value;
      }
      return product;
    });
    setProducts(newData);
  };

  const handleSave = (product) => {
    if (product.quantity > 0) {
      updateQuantityAndSupplier({
        variables: {
          ids: [product.id],
          quantity: product.quantity,
          supplierId: product.currentSupplierId,
        },
      }).then(() => {
        notify('Information updated successfully');
      }).catch((error) => {
        if (!product.currentSupplierId) {
          notify(
            'You cannot update because the product does not have supplier. Assign supplier first',
          );
        } else {
          notify(
            `You cannot exceed the current reorder maximum of ${error.message.slice(
              49,
            )} products`,
          );
        }
      });
    } else {
      notify('You cannot set less than 1 product');
    }
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const selectedRow = products
    ? products.filter(row => row.id === selected[0])
    : null;

  return (
    <Fragment>
      <Paper elevation={2}>
        <TableToolbar
          name="toolbar"
          numSelected={selected.length}
          selectedRow={selectedRow}
          selected={selected}
          isSearchActive={isSearchActive}
          handleClickSearch={handleClickSearch}
          handleHideSearch={handleHideSearch}
          deselect={setSelected}
          productsAmount={products.length}
          products={products}
          searchDataValues={searchDataValues}
          orderId={orderId}
        />
        <div>
          <Table aria-labelledby="tableTitle">
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
              columnHeaders={columnHeaders}
            />
            <TableBody>
              {
                products && products.length ? (
                  stableSort(products, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell
                            padding="checkbox"
                            align="center"
                            className={`${classes.orderTableCell}`}
                          >
                            <CustomCheckbox
                              onClick={() => handleClick(row.id)}
                              checked={isItemSelected}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="left"
                            className={`${classes.orderTableCell} ${classes.orderName}`}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell className={classes.orderTableCell} align="left">{row.sku}</TableCell>
                          <TableCell className={classes.orderTableCell} align="left">{row.qtyInStock}</TableCell>
                          <TableCell className={classes.orderTableCell} align="left">
                            <TextField
                              id={`qty-${row.id}`}
                              value={row.quantity}
                              onChange={handleQuantityChange(row.id)}
                              onBlur={() => handleSave(row)}
                              variant="filled"
                              size="small"
                              InputProps={{ classes }}
                            />
                          </TableCell>
                          <TableCell className={classes.orderTableCell} align="left">
                            {(
                              row.currentSupplierId
                              || row.preferredSupplierId
                              || row.backupSupplierId
                            ) && (
                              <Select
                                labelId={`select-label-${row.id}`}
                                value={row.currentSupplierId}
                                onChange={handleSupplierChange(row.id)}
                                onBlur={() => handleSave(row)}
                                variant="filled"
                                size="small"
                                className={`${classes.underline} ${classes.root} ${classes.select} `}
                                inputProps={{ id: `supplier-${row.id}`, }}
                              >
                                {row.currentSupplierId
                                  ? (
                                    <MenuItem value={row.currentSupplierId}>
                                      {`${row.currentSupplierName} (current supplier)`}
                                    </MenuItem>
                                  )
                                  : null
                                }
                                {row.preferredSupplierId
                                && (row.preferredSupplierName
                                  !== 'QuickBookVendor(default)'
                                  && row.preferredSupplierName
                                  !== 'Cosdiv enterprises')
                                  ? (
                                    <MenuItem value={row.preferredSupplierId}>
                                      {`${row.preferredSupplierName} (preferred supplier)`}
                                    </MenuItem>
                                  )
                                  : null
                                }
                                {row.backupSupplierId
                                && (row.backupSupplierName
                                  !== 'QuickBookVendor(default)'
                                  && row.backupSupplierName
                                  !== 'Cosdiv enterprises')
                                  ? (
                                    <MenuItem value={row.backupSupplierId}>
                                      {`${row.backupSupplierName} (backup supplier)`}
                                    </MenuItem>
                                  )
                                  : null
                                }
                              </Select>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : ((<TableRow><TableCell align="center" colSpan={14}>No products</TableCell></TableRow>))
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
  );
};

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  columnHeaders: PropTypes.arrayOf(String),
  data: PropTypes.arrayOf(Object),
  orderId: PropTypes.string,
  updateQuantityAndSupplier: PropTypes.func.isRequired,
};

DataTable.defaultProps = {
  columnHeaders: '',
  data: {},
  orderId: '',
};

const UPDATE_PRODUCT_BATCH_MUTATION = graphql(UPDATE_PRODUCT_BATCH, { name: 'updateQuantityAndSupplier' });

export default compose(UPDATE_PRODUCT_BATCH_MUTATION)(withStyles(TableStyles)(DataTable));
