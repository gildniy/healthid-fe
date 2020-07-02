import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import supplierOrderStyles from '../../../assets/styles/orders/supplierOrderForm';
import currencyFormatter from '../../payment/utils/formatter';

const OrderTable = ({
  orderDetails, currency: symbol
}) => {
  const StyledTableCell = withStyles(
    () => ({
      head: {
        fontSize: 14,
        fontWeight: 'bolder',
        backgroundColor: '#E8E8E8',
        color: '#424242',
      },
      body: {
        fontSize: '1em',
        color: '#424242',
        lineHeight: '20px',
        letterSpacing: '.05em'
      },
    })
  )(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.white,
      },
    },
  }))(TableRow);

  const currency = (
    <span style={supplierOrderStyles.currency}>
      {symbol}
    </span>
  );

  const customStyle = supplierOrderStyles.customTableStyles;
  const grandTotal = orderDetails.map(
    ({ quantity, unitCost }) => quantity * unitCost
  ).reduce((sum, i) => sum + i, 0);
  return (
    <Table
      aria-label="customized table"
      style={{ marginTop: '20px' }}
    >
      <TableHead>
        <TableRow>
          <StyledTableCell style={customStyle}>PRODUCT NAME</StyledTableCell>
          <StyledTableCell style={customStyle}>QTY ORDERED</StyledTableCell>
          <StyledTableCell style={customStyle}>COST PER ITEM</StyledTableCell>
          <StyledTableCell style={customStyle}>PRICE</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderDetails.map(({
          id, product, quantity, unitCost
        }) => (
          <StyledTableRow key={id}>
            <StyledTableCell component="th" scope="row" style={customStyle}>
              {product.productName}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" style={customStyle}>
              {quantity}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" style={customStyle}>
              {currency}
              {' '}
              {currencyFormatter(unitCost)}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" style={customStyle}>
              {currency}
              {' '}
              {currencyFormatter(unitCost * quantity)}
            </StyledTableCell>
          </StyledTableRow>
        ))}
        <StyledTableRow style={supplierOrderStyles.lastTableRow}>
          <StyledTableCell colSpan={2} component="th" scope="row" style={customStyle}>
            {' '}
          </StyledTableCell>
          <StyledTableCell component="th" scope="row" style={{ ...customStyle, ...supplierOrderStyles.grandTotal }}>
            GRAND TOTAL
          </StyledTableCell>
          <StyledTableCell component="th" scope="row" style={{ ...customStyle, ...supplierOrderStyles.grandTotal }}>
            {currency}
            {' '}
            {currencyFormatter(grandTotal)}
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  );
};
OrderTable.propTypes = {
  orderDetails: PropTypes.instanceOf(Object),
  currency: PropTypes.string
};

OrderTable.defaultProps = {
  orderDetails: {},
  currency: ''
};

export default OrderTable;
