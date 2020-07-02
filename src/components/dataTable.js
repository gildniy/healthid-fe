import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow, TableCell, TableBody, Table,
} from '@material-ui/core';
import Moment from 'react-moment';
import columns from './orderColumns';
import { TableStyles } from '../assets/styles/stock/stock';
import TableHeader from './stock_control/Table/TableHeader';
import { getSortedData } from './products/filter';
import CustomCheckbox from './shared/customCheckbox';

const OrdersTable = React.forwardRef(({
  selected,
  order,
  orderBy,
  handleSelectAllClick,
  handleRequestSort,
  rows,
  isSelected,
  status,
  handleRowSeleted,
  onRowClick,
  reverseLookUp
}, ref) => (
  <div className={TableStyles.tableWrapper} ref={ref}>
    <Table
      className={TableStyles.table}
      aria-labelledby="tableTitle"
    >
      <TableHeader
        numSelected={selected.length}
        order={order}
        orderBy={orderBy}
        status={status}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
        rowCount={(rows && rows.length) || 0}
        headRows={columns(status)}
      />
      <TableBody>
        {rows && rows.length > 0
          ? getSortedData(rows, order, orderBy)
            .map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  style={TableStyles.tableRow}
                  selected={isItemSelected}
                  onClick={() => {
                    onRowClick(row);
                  }}
                >
                  <TableCell padding="checkbox" align="center" Style={TableStyles.checkBox}>
                    <CustomCheckbox
                      style={{ marginLeft: '1.2rem' }}
                      checked={isItemSelected}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRowSeleted(event, row.id);
                      }}
                    />
                  </TableCell>
                  <TableCell style={TableStyles.tableCell}>
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                      {row.updatedAt}
                    </Moment>
                  </TableCell>
                  <TableCell style={TableStyles.orderName}>
                    {row.supplierOrderName || ''}
                  </TableCell>
                  <TableCell style={TableStyles.tableCell}>
                    {row.status}
                  </TableCell>
                  <TableCell style={TableStyles.tableCell}>
                    {(row.orderDetails.length
                  && row.orderDetails[0].supplier
                  && row.orderDetails[0].supplier.suppliersmetaSet.length
                  && row.orderDetails[0].supplier.suppliersmetaSet
                    .map(e => e.displayName)) || ''}
                  </TableCell>
                  <TableCell style={TableStyles.tableCell}>
                    {row.grandTotal}
                  </TableCell>
                </TableRow>
              );
            }) : (<TableRow><TableCell align="center" colSpan={14}>No Orders here yet</TableCell></TableRow>)
        }
      </TableBody>
    </Table>
  </div>
));
OrdersTable.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rows: PropTypes.instanceOf(Object).isRequired,
  isSelected: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  handleRowSeleted: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default OrdersTable;
