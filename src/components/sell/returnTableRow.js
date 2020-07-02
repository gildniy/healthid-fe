import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow, TableCell, Typography, Tooltip,
} from '@material-ui/core';
import { NotesIcon, TrashIcon, DiscountIcon } from '../../assets/SvgIcons/sellScreenSvgs';
import FormatCurrency from '../utils/formatCurrency';
import ReturnQuantity from './returnQuantity';
import { tableStyles as styles } from '../../assets/css/sellScreenStyles';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';

import { useStateValue } from '../../providers/stateProvider';

const ReturnTableRow = ({
  item,
  currency,
  handleCartItemNote,
  handleCartItemDelete,
  calculateTotal,
}) => {
  const [, dispatch] = Object.values(useStateValue());
  const handleClickViewDetails = () => {
    dispatch({
      type: sellActionTypes.SET_SELECTED_PRODUCT,
      payload: item
    });
    dispatch({ type: sellActionTypes.TOGGLE_SALE_BATCH_DIALOG, payload: { isEditing: true } });
  };
  const {
    id, productName, salesPrice, quantity, discount
  } = item;
  const dispensingSize = item.dispensingSize
    ? item.dispensingSize.name
    : 'no dispensing size';
  return (
    <TableRow
      id="cart-table-row"
      style={styles.batchRow}
    >
      <TableCell align="left" style={styles.tableCell}>
        <Typography variant="subtitle2" style={styles.tableTypo}>
          {productName}
        </Typography>
        <Typography variant="caption" style={styles.tableTypoCaption}>
          {dispensingSize}
        </Typography>
      </TableCell>
      <TableCell align="left" style={styles.tableCell}>
        <ReturnQuantity
          item={item}
          handleClickViewDetails={handleClickViewDetails}
        />
      </TableCell>
      <TableCell align="left" style={styles.tableCell}>
        <FormatCurrency
          amount={salesPrice}
          currency={currency}
        />
      </TableCell>
      <TableCell align="left" style={styles.tableCell}>
        <FormatCurrency
          amount={calculateTotal(quantity, salesPrice)}
          currency={currency}
        />
      </TableCell>
      <TableCell align="right" style={styles.tableIconCell}>
        {discount ? (
          <Tooltip title={`${discount}%`}>
            <DiscountIcon
              id={id}
              style={styles.icons}
            />
          </Tooltip>
        ) : ''}
      </TableCell>
      <TableCell align="right" style={styles.tableIconCell}>
        <NotesIcon
          id={id}
          style={styles.icons}
          onClick={handleCartItemNote}
        />
      </TableCell>
      <TableCell align="right" style={styles.tableIconCell}>
        <TrashIcon
          style={styles.icons}
          onClick={() => handleCartItemDelete(item)}
        />
      </TableCell>
    </TableRow>
  );
};

ReturnTableRow.propTypes = {
  item: PropTypes.instanceOf(Object),
  currency: PropTypes.string,
  handleCartItemNote: PropTypes.func.isRequired,
  handleCartItemDelete: PropTypes.func.isRequired,
  calculateTotal: PropTypes.func.isRequired,
};

ReturnTableRow.defaultProps = {
  item: {},
  currency: '',
};

export default ReturnTableRow;
