import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TableRow, TableCell } from '@material-ui/core';
import currencyFormatter from './utils/formatter';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const ProductsToSaleList = ({ product }) => {
  const {
    quantity, productName, salesPrice, discount, discountedTotal, dispensingSize,
  } = product;

  const newDispensingSize = dispensingSize.name !== 'NULL'
    ? dispensingSize.name
    : 'no dispensing size';
  return (
    <TableRow key={productName} id="productRow">
      <TableCell style={salesDialogStyles.productListCell}>
        {productName}
        <Typography variant="caption" style={salesDialogStyles.productDispensingSize}>
          {newDispensingSize}
        </Typography>
      </TableCell>
      <TableCell style={salesDialogStyles.generalProductListCell}>
        {quantity}
      </TableCell>
      <TableCell style={salesDialogStyles.generalProductListCell}>
        {currencyFormatter(salesPrice)}
      </TableCell>
      <TableCell style={salesDialogStyles.generalProductListCell}>
        {`${discount}${'%'}`}
      </TableCell>
      <TableCell style={salesDialogStyles.discountedTotalCell}>
        {currencyFormatter(discountedTotal)}
      </TableCell>
    </TableRow>
  );
};

ProductsToSaleList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

export default ProductsToSaleList;
