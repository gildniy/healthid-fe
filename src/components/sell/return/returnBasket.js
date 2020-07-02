import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Paper, Table, TableHead, TableRow, TableBody, TableCell, Select, MenuItem, Grid
} from '@material-ui/core';
import { addedItems, tableStyles } from '../../../assets/css/sellScreenStyles';
import { useStateValue } from '../../../providers/stateProvider';
import ReturnBasketTableRow from './returnBasketTableRow';
import returnsActionTypes from '../../../providers/reducers/returns/returnsTypes';
import returnStyles from '../../../assets/styles/returns';

export const ReturnBasket = () => {
  const [
    {
      returns: {
        toBeReturnedBatches, aggregatedBatches, currency
      }
    },
    dispatch
  ] = Object.values(useStateValue());
  const options = [
    { key: 1, reason: 'Reason for return' },
    { key: 2, reason: 'Product Expired' },
    { key: 3, reason: 'Not original' },
    { key: 4, reason: 'Leaking' },
    { key: 5, reason: 'Other Reason' },
  ];
  useEffect(() => {
    dispatch({ type: returnsActionTypes.AGGREGATE_BATCHES });
  }, [toBeReturnedBatches]);
  const handleCartItemNote = (event, item) => {
    const { currentTarget } = event;
    dispatch({
      type: returnsActionTypes.SET_RETURN_STATE,
      payload: {
        cartItemNoteEl: currentTarget,
        clickedCartItem: item,
        openNotePopper: true,
      }
    });
  };

  const handleCartItemDelete = (item) => {
    dispatch({
      type: returnsActionTypes.REMOVE_FROM_CART,
      payload: item.saleDetailIds
    });
  };
  const calculateTotal = (quantity, salesPrice) => quantity * salesPrice;
  const renderBasket = () => {
    const basket = [];
    aggregatedBatches.forEach((productInfo) => {
      basket.push(<ReturnBasketTableRow
        key={productInfo.id}
        item={productInfo}
        currency={currency}
        handleCartItemNote={e => handleCartItemNote(e, productInfo)}
        handleCartItemDelete={handleCartItemDelete}
        calculateTotal={calculateTotal}
      />);
    });
    return basket;
  };

  const renderTableCell = (align, style, name) => (
    <TableCell
      align={align || 'inherit'}
      style={style}
    >
      {name || ''}
    </TableCell>
  );
  return (
    <Paper elevation={0} style={returnStyles.tablePaper}>
      <Table style={tableStyles.table}>
        <colgroup>
          <col width="30%" />
          <col width="17%" />
          <col width="16%" />
          <col width="18%" />
          <col width="8%" />
          <col width="8%" />
          <col width="3%" />
        </colgroup>
        <TableHead>
          <TableRow style={tableStyles.headerRow}>
            {renderTableCell('left', tableStyles.tableHeader, 'ITEM')}
            {renderTableCell('left', tableStyles.tableHeader, 'QUANTITY')}
            {renderTableCell('left', tableStyles.tableHeader, 'PRICE')}
            {renderTableCell('left', tableStyles.tableHeader, 'TOTAL')}
            {renderTableCell('center', tableStyles.tableHeader, '')}
            {renderTableCell('center', tableStyles.tableHeader, '')}
            {renderTableCell('center', tableStyles.tableHeader, '')}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderBasket()}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withRouter(ReturnBasket);
