import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { Typography, Paper, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import orderTableStyles from '../../../assets/styles/orders/orderTableStyles';
import { useStateValue } from '../../../providers/stateProvider';
import currencyFormatter from '../../payment/utils/formatter';
import { addQty } from './helpers';

const OrderTable = ({
  orderDetails, openBatchModal, openNotReceivedModal, markAsReceived,
  status
}) => {
  const [{ batchInformation }] = Object.values(useStateValue());
  const [total, setTotal] = useState(0);
  const pricefn = (qty, cost) => Math.round(qty * cost);
  const orderedDetails = addQty(orderDetails, pricefn);

  const rows = status !== 'CLOSED'
    ? orderedDetails
    : orderedDetails.filter(row => row.status !== 'NOT_RECEIVED');

  useEffect(() => {
    const totalPrice = rows.reduce((tot, detail) => tot + detail.price, 0);
    setTotal(totalPrice);
  });
  const currency = (
    <span style={orderTableStyles.currency}>
      &#8358;
    </span>
  );

  batchInformation.batch.productBatches.map((data) => {
    rows.map((row) => {
      if (row.id.toString(10) === data.productId.toString(10)) {
        const foundIndex = rows.findIndex(
          _row => _row.id.toString(10) === data.productId.toString(10)
        );
        rows[foundIndex] = {
          ...row,
          qtyOrdered: data.quantityReceived,
          cost: data.costPerItem,
          price: pricefn(data.quantityReceived, data.costPerItem),
          edited: true
        };
      }
      return '';
    });
    return '';
  });
  const tableHeader = status === 'CLOSED'
    ? 'Reconciled Batches' : 'Reconcile Received Product Batch';

  return (
    <Paper elevation={2} square style={orderTableStyles.paper}>
      <Grid item container justify="flex-start">
        <Typography variant="h6" style={orderTableStyles.headerTypo}>
          {tableHeader}
        </Typography>
      </Grid>
      <Table
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={orderTableStyles.headName}>NAME</TableCell>
            <TableCell style={orderTableStyles.head}>SALES PRICE</TableCell>
            <TableCell style={orderTableStyles.head}>
              {status === 'CLOSED' ? 'QTY RECEIVED' : 'QTY ORDERED'}
            </TableCell>
            <TableCell style={orderTableStyles.head}>COST PER ITEM</TableCell>
            <TableCell style={orderTableStyles.head}>PRICE</TableCell>
            {status !== 'CLOSED' ? <TableCell style={orderTableStyles.head} /> : '' }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow style={orderTableStyles.root} key={row.name}>
              <TableCell
                component="th"
                scope="row"
                style={row.qtyOrdered === 0
                  ? orderTableStyles.notReceivedStyle : orderTableStyles.customName}
              >
                {row.name}
              </TableCell>
              <TableCell
                style={row.qtyOrdered === 0
                  ? orderTableStyles.notReceivedStyle : orderTableStyles.customStyle}
              >
                {currency}
                {currencyFormatter(row.salesPrice)}
              </TableCell>
              <TableCell
                style={row.qtyOrdered === 0
                  ? orderTableStyles.notReceivedStyle : orderTableStyles.customStyle}
              >
                {row.qtyOrdered}
              </TableCell>
              <TableCell
                style={row.qtyOrdered === 0
                  ? orderTableStyles.notReceivedStyle : orderTableStyles.customStyle}
              >
                {currency}
                {currencyFormatter(row.cost)}
              </TableCell>
              <TableCell
                style={row.qtyOrdered === 0
                  ? orderTableStyles.notReceivedStyle : orderTableStyles.customStyle}
              >
                {currency}
                {currencyFormatter(row.price)}
              </TableCell>
              {status !== 'CLOSED' ? (
                row.qtyOrdered === 0 ? (
                  <TableCell style={orderTableStyles.iconStyle}>
                    <Tooltip title="Mark as received" placement="top">
                      <IconButton onClick={() => markAsReceived(row)}>
                        {row.status === 'NOT_RECEIVED'
                          ? <CheckCircleOutlinedIcon />
                          : <CheckCircleOutlinedIcon />
                        }
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                ) : (
                  <TableCell style={orderTableStyles.iconStyle}>
                    <div style={{ display: 'flex' }}>
                      <Tooltip title="Mark as not received" placement="top">
                        <IconButton onClick={() => openNotReceivedModal(row)}>
                          {row.status === 'NOT_RECEIVED'
                            ? <CheckCircleOutlinedIcon />
                            : <DeleteIcon />
                          }
                        </IconButton>
                      </Tooltip>
                      {status !== 'CLOSED' ? (
                        row.qtyOrdered === 0
                          ? <TableCell style={orderTableStyles.iconStyle} />
                          : (
                            <Tooltip title="Add Batch" placement="top">
                              <IconButton onClick={() => openBatchModal(row)}>
                                {row.status === 'IN_STOCK'
                                  ? <CheckIcon />
                                  : <EditIcon />
                                }
                              </IconButton>
                            </Tooltip>
                          )
                      ) : ' '}
                    </div>
                  </TableCell>
                )
              ) : ''}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} />
            <TableCell component="th" style={orderTableStyles.customTotal}>
              <Typography style={orderTableStyles.totalStyle}>
                GRAND TOTAL
              </Typography>
            </TableCell>
            <TableCell style={orderTableStyles.customStyle}>
              {currency}
              <span style={orderTableStyles.grandStyle}>{currencyFormatter(total)}</span>
            </TableCell>
            {status === 'CLOSED' ? '' : <TableCell />}
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

OrderTable.propTypes = {
  orderDetails: PropTypes.instanceOf(Array),
  openBatchModal: PropTypes.func.isRequired,
  openNotReceivedModal: PropTypes.func.isRequired,
  markAsReceived: PropTypes.func.isRequired,
  status: PropTypes.string
};

OrderTable.defaultProps = {
  orderDetails: [],
  status: ''
};

export default withStyles(orderTableStyles)(OrderTable);
