import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, IconButton,
} from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { tableStyles } from '../../../assets/styles/products/productDetailStyles';
import currencyFormatter from '../../payment/utils/formatter';

export const PRODUCT_BATCH_IN_STOCK = 'IN_STOCK';
export const PRODUCT_BATCH_EXPIRED = 'EXPIRED';
export const PRODUCT_BATCH_REF_OUT_STOCK = 'OUT OF STOCK';

const BatchInformation = (props) => {
  const [batchId, setBatchId] = useState('');
  const {
    classes, renderTableCell, withPriceField, productName, productId,
    currency, priceTotal, quantityInStock
  } = props;

  const handleMouseLeave = () => {
    if (batchId) {
      setBatchId('');
    }
  };
  const handleRowHover = (batch, event) => {
    setBatchId(event.currentTarget.id);
  };
  const isEligibleProductBatch = batch => (!!batch.batchRef
      && (batch.batchRef.trim() !== PRODUCT_BATCH_REF_OUT_STOCK))
        && ((batch.status === PRODUCT_BATCH_IN_STOCK)
            || (batch.status === PRODUCT_BATCH_EXPIRED));
  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
          Batch Information
        </Typography>
      </div>
      <Grid container className={classes.batchDiv}>
        <Grid container item xs={12} style={tableStyles.batchHeader}>
          <Table style={tableStyles.table}>
            <TableHead style={tableStyles.header}>
              <TableRow style={tableStyles.batchRow}>
                {renderTableCell('left', tableStyles.tableHeader1, 'Date Received')}
                {renderTableCell('left', tableStyles.tableHeader, 'Batch #')}
                {renderTableCell('left', tableStyles.tableHeader, 'Supplier')}
                {renderTableCell('left', tableStyles.tableHeader, 'Expiry Date')}
                {renderTableCell('left', tableStyles.tableHeader, 'Qty on Hand')}
                {renderTableCell('left', tableStyles.tableHeader, 'Cost per Item')}
                {renderTableCell('left', tableStyles.tableHeader, 'Total Cost')}
                {renderTableCell('left', tableStyles.tableHeader3, '')}
              </TableRow>
            </TableHead>
            <TableBody>
              {withPriceField.filter(isEligibleProductBatch).map(batch => (
                <TableRow
                  id={batch.id}
                  key={batch.id}
                  hover
                  classes={classes.tableRow}
                  style={tableStyles.batchRow}
                  onMouseEnter={event => handleRowHover(batch, event)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <TableCell component="th" scope="row" style={tableStyles.tableCell1}>
                    {batch.dateReceived}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {batch.batchRef.split('-')[0].toUpperCase()}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {batch.supplier.name}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {batch.expiryDate}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {batch.quantity ? batch.quantity : 0}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {currency}
                    {' '}
                    {currencyFormatter(batch.unitCost)}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {currency}
                    {' '}
                    {currencyFormatter(batch.price)}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row" style={tableStyles.tableCellDot}>
                    <Link to={{
                      pathname: '/stock/batchDetails',
                      state: {
                        batchDetails: { ...batch },
                        productName,
                        productId,
                        currency,
                      }
                    }}
                    >
                      {batchId === batch.id ? (
                        <>
                          <IconButton style={{ padding: '0.3em', marginLeft: '.8rem' }}>
                            <KeyboardArrowRight style={{ padding: '0px' }} />
                          </IconButton>
                        </>
                      ) : <div />}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid container item xs={12} justify="flex-end" style={tableStyles.total}>
          <Grid container item style={tableStyles.totalGrid}>
            <Typography style={tableStyles.textTotal1}>
              Total Qty
            </Typography>
            <Typography style={tableStyles.textGrandTotal1}>
              {quantityInStock}
            </Typography>
          </Grid>
          <Grid container item style={tableStyles.grandTotalGrid}>
            <Typography style={tableStyles.textTotal}>
              Grand Total
            </Typography>
            <Typography style={tableStyles.textGrandTotal}>
              {`${currency} ${currencyFormatter(priceTotal(withPriceField.filter(isEligibleProductBatch)))}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

BatchInformation.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  renderTableCell: PropTypes.func.isRequired,
  withPriceField: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func
  })).isRequired,
  currency: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  quantityInStock: PropTypes.number.isRequired,
  priceTotal: PropTypes.func.isRequired,
};

export default BatchInformation;
