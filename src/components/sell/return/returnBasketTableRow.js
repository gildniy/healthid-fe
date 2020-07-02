import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow, TableCell, Typography, MenuItem, Grid, Select,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { NotesIcon, TrashIcon } from '../../../assets/SvgIcons/sellScreenSvgs';
import FormatCurrency from '../../utils/formatCurrency';
import ReturnQuantity from '../returnQuantity';
import { tableStyles as styles } from '../../../assets/css/sellScreenStyles';

import { useStateValue } from '../../../providers/stateProvider';
import returnStyles from '../../../assets/styles/returns';
import returnsActionTypes from '../../../providers/reducers/returns/returnsTypes';

const ReturnBasketTableRow = ({
  item,
  currency,
  handleCartItemNote,
  handleCartItemDelete,
  calculateTotal,
}) => {
  const [, dispatch] = Object.values(useStateValue());
  const options = [
    { reason: 'Select' },
    { reason: 'Customer error' },
    { reason: 'Retailer error' },
    { reason: 'Damaged product' },
    { reason: 'Expired product' },
    { reason: 'Other (please add to item note)' },
  ];
  const handleClickViewDetails = () => {
    dispatch({
      type: 'TOGGLE_PROCESS_RETURN_DIALOG',
    });
  };
  const handleSelectedCheckBox = () => {
    dispatch({ type: returnsActionTypes.TOGGLE_ITEM_RESELLABBLE, payload: item });
  };
  const handleChange = (e) => {
    dispatch({
      type: returnsActionTypes.SET_RETURN_REASON,
      payload: { item, reason: e.target.value }
    });
  };
  const {
    id, productName, salesPrice, quantity, resellable, reason
  } = item;
  const dispensingSize = item.dispensingSize
    ? item.dispensingSize.name
    : 'no dispensing size';
  return (
    <Fragment>
      <TableRow
        id="cart-table-row"
        style={{ ...returnStyles.batchRow, ...returnStyles.avenirMedium }}
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
      <TableRow
        id="cart-table-row"
        style={returnStyles.batchRow}
      >
        <TableCell colSpan={7} style={returnStyles.returnReasonTableCell}>
          <Grid container style={returnStyles.w100}>
            <Grid item xs={9}>
              <Typography variant="subtitle2" style={styles.tableTypo}>
                Reason for return
              </Typography>
              <Paper style={returnStyles.noRadius}>
                <Select
                  required
                  style={returnStyles.select}
                  name="destinationOutlet"
                  value={reason}
                  onChange={handleChange}
                >
                  {
                    options.map(option => (
                      <MenuItem
                        style={returnStyles.outletMenu}
                        key={option.reason}
                        value={option.reason}
                      >
                        <Grid container justify="space-between">
                          <Grid item style={returnStyles.outletName}>
                            {option.reason}
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))
                  }
                </Select>
              </Paper>
            </Grid>
            <Grid item xs={3} style={{ ...returnStyles.center, paddingLeft: '10px' }}>
              <Typography variant="subtitle2" style={styles.tableTypo}>
                Resellable?
              </Typography>
              <Checkbox
                color="primary"
                checked={resellable}
                value="checkedG"
                disableRipple
                style={returnStyles.MuiIconButtonCheck}
                onClick={handleSelectedCheckBox}
              />
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>

    </Fragment>
  );
};

ReturnBasketTableRow.propTypes = {
  item: PropTypes.instanceOf(Object),
  currency: PropTypes.string,
  handleCartItemNote: PropTypes.func.isRequired,
  handleCartItemDelete: PropTypes.func.isRequired,
  calculateTotal: PropTypes.func.isRequired,
};

ReturnBasketTableRow.defaultProps = {
  item: {},
  currency: '',
};

export default ReturnBasketTableRow;
