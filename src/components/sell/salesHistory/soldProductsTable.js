import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import formatCurrency from '../../utils/formatCurrency';
import { saleHistoryTableStyles } from '../../../assets/styles/salesHistory/saleHistoryDetail';

const SoldProductsTable = ({ products, currency }) => {
  const headers = ['Item', 'Qty Sold', 'Qty in Stock', 'Item Cost', 'Discount', 'Price'];
  return (
    <Table style={saleHistoryTableStyles.tableStyles} aria-label="simple table">
      <TableHead style={saleHistoryTableStyles.header}>
        <TableRow>
          {
            headers.map(header => (<TableCell key={header} style={saleHistoryTableStyles.generalFont} align="left">{header}</TableCell>))
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map(singleProduct => (
          <TableRow key={singleProduct.id}>
            <TableCell style={saleHistoryTableStyles.generalFont} scope="row">
              {singleProduct.product.productName}
              <span style={saleHistoryTableStyles.dispensingSize}>{singleProduct.product.dispensingSize.name === 'NULL' ? '' : singleProduct.product.dispensingSize.name}</span>
            </TableCell>
            <TableCell style={saleHistoryTableStyles.generalFont} scope="row">
              {singleProduct.quantity}
            </TableCell>
            <TableCell style={saleHistoryTableStyles.generalFont} scope="row">
              {singleProduct.product.quantityInStock}
            </TableCell>
            <TableCell style={saleHistoryTableStyles.generalFont} scope="row">
              <span style={saleHistoryTableStyles.currencyStyles}>{currency}</span>
              {formatCurrency({ amount: singleProduct.price })}
            </TableCell>
            <TableCell style={saleHistoryTableStyles.generalFont} scope="row">
              {singleProduct.discount}
              %
            </TableCell>
            <TableCell style={saleHistoryTableStyles.generalFont} scope="row">
              <span style={saleHistoryTableStyles.currencyStyles}>{currency}</span>
              {formatCurrency({ amount: singleProduct.price * singleProduct.quantity })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

SoldProductsTable.propTypes = {
  products: PropTypes.objectOf(PropTypes.any).isRequired,
  currency: PropTypes.string.isRequired
};
export default SoldProductsTable;
