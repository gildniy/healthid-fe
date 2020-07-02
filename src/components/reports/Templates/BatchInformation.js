import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, IconButton,
} from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { tableStyles } from '../../../assets/styles/products/productDetailStyles';
import currencyFormatter from '../../payment/utils/formatter';

const BatchInformation = (props) => {
  const [batchId, setBatchId] = useState('');
  const {
    classes, renderTableCell, withPriceField, productName, productId,
    currency, quantityTotal, priceTotal,
  } = props;

  const handleMouseLeave = () => {
    if (batchId) {
      setBatchId('');
    }
  };
  const handleRowHover = (batch, event) => {
    setBatchId(event.currentTarget.id);
  };

  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
          Batch Information
        </Typography>
      </div>
      <Grid container spacing={3} className={classes.batchDiv}>
        <Grid item xs={24} style={tableStyles.batchHeader}>
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
              {withPriceField.map(batch => (
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
                    {batch.batchNo.split('-')[0].toUpperCase()}
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
                          <IconButton style={{ padding: '0.3em' }}>
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
          <Grid
            container
            item
            style={tableStyles.totalGrid}
            justify="flex-end"
          >
            <Grid
              container
              xs={6}
              item
              style={tableStyles.textTotal1}
              justify="flex-end"
            >
              Total Qty
            </Grid>
            <Grid
              container
              item
              xs={6}
              style={tableStyles.textGrandTotal1}
              justify="flex-end"
            >
              {quantityTotal(withPriceField)}
            </Grid>
          </Grid>
          <Grid
            container
            item
            style={tableStyles.grandTotalGrid}
            justify="flex-end"
          >
            <Grid xs={6} container justify="flex-end" item style={tableStyles.textTotal}>Grand Total</Grid>
            <Grid xs={6} container justify="flex-end" item style={tableStyles.textGrandTotal}>
              {currency}
              {' '}
              {currencyFormatter(priceTotal(withPriceField))}
            </Grid>
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
  productId: PropTypes.number.isRequired,
  quantityTotal: PropTypes.func.isRequired,
  priceTotal: PropTypes.func.isRequired,
};

export default BatchInformation;
