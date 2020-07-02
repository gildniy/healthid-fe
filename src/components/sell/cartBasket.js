import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Paper, Table, TableHead, TableRow, TableBody, TableCell
} from '@material-ui/core';
import { addedItems, tableStyles } from '../../assets/css/sellScreenStyles';
import ReturnTableRow from './returnTableRow';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';
import { useStateValue } from '../../providers/stateProvider';

export const CartBasket = () => {
  const [
    { sell: { currency, cart } },
    dispatch
  ] = Object.values(useStateValue());

  const handleCartItemNote = (event, item) => {
    const { currentTarget } = event;
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        cartItemNoteEl: currentTarget,
        clickedCartItem: item,
        openNotePopper: true,
      }
    });
  };

  const handleCartItemDelete = (item) => {
    dispatch({
      type: sellActionTypes.REMOVE_FROM_CART,
      payload: item
    });
  };

  const calculateTotal = (quantity, salesPrice) => quantity * salesPrice;

  const renderTableCell = (align, style, name) => (
    <TableCell
      align={align || 'inherit'}
      style={style}
    >
      {name || ''}
    </TableCell>
  );
  return (
    <Paper elevation={0} style={addedItems.tablePaper}>
      <Table style={tableStyles.table}>
        <colgroup>
          <col width="24%" />
          <col width="20%" />
          <col width="16%" />
          <col width="16%" />
          <col width="8%" />
          <col width="8%" />
          <col width="8%" />
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
          {cart.map(item => (
            <ReturnTableRow
              key={item.id}
              item={item}
              currency={currency}
              handleCartItemNote={e => handleCartItemNote(e, item)}
              handleCartItemDelete={handleCartItemDelete}
              calculateTotal={calculateTotal}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withRouter(CartBasket);
