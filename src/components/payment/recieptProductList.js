import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@material-ui/core';
import currencyFormatter from './utils/formatter';

const RecieptProductList = ({ product, classes }) => {
  const {
    quantity, productName, discountedTotal, salesPrice,
  } = product;
  return (
    <TableRow
      key={productName}
      id="productRow"
      className={classes.noBorderRow}
    >
      <TableCell
        align="left"
        size="small"
        colSpan={2}
        className={classes.receiptBodyProductName}
      >
        {productName}
      </TableCell>
      <TableCell
        align="right"
        size="small"
        className={classes.receiptBody}
      >
        {`${quantity} x ${currencyFormatter(salesPrice)}`}
      </TableCell>
      <TableCell
        align="right"
        size="small"
        className={classes.receiptBody}
      >
        {`${currencyFormatter(discountedTotal)}`}
      </TableCell>
    </TableRow>
  );
};

RecieptProductList.propTypes = {
  product: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
};

RecieptProductList.defaultProps = {
  product: {},
  classes: {},
};

export default RecieptProductList;
