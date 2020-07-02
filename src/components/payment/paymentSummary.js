import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, List, ListItem, ListItemText, DialogContent,
  Input, InputAdornment, Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import salesDialogStyles from '../../assets/css/salesDialogStyles';
import currencyFormatter from './utils/formatter';

const styles = salesDialogStyles;

const PaymentSummary = ({
  classes, currency, totalToPay, balanceDue, cashRecieved,
  cashChecked, cardChecked, bankChecked, handleCashInput,
  prefferedPayMethod
}) => {
  const computedBalance = currencyFormatter(balanceDue);
  let payingWithCash = cashChecked || prefferedPayMethod === 'cash';
  const payingWithCard = cardChecked || prefferedPayMethod === 'card';
  const payingWithBank = bankChecked || prefferedPayMethod === 'bank_transfer';

  const noPaymentMethodChosen = (
    !payingWithCash
    && !payingWithCard
    && !payingWithBank
    && prefferedPayMethod === 'all');

  if (noPaymentMethodChosen) {
    payingWithCash = true;
  }


  return (
    <DialogContent className={classes.mainDialog}>
      <List key="payment-summary-list" className={classes.lists}>
        <ListItem key="total-amount">
          <ListItemText
            primary={(
              <Typography className={classes.finalSaleTotal}>
                Total to pay
              </Typography>
            )}
            disableTypography
          />
          <ListItemText
            style={{ padding: 0 }}
            primary={(
              <Typography className={classes.finalSaleSum}>
                {`${currency} ${totalToPay}`}
              </Typography>
            )}
          />
        </ListItem>
      </List>
      <Divider light className={classes.halfDivider} />
      <List key="payment-options-list" className={classes.paymentMethodText}>
        <ListItem key="input-amount" style={{ padding: '16px 0' }}>
          <ListItemText
            primary={(
              <Typography
                variant="h6"
                className={classes.finalSaleTotal}
              >
                {payingWithCash && 'Total paid with CASH'}
                {payingWithCard && 'Total paid with CARD'}
                {payingWithBank && 'Total to be transfered'}
              </Typography>
            )}
            disableTypography
          />
          {payingWithCard && (
            <ListItemText primary={(
              <Typography className={classes.totalSum}>
                {`${currency} ${totalToPay}`}
              </Typography>
            )}
            />
          )}
          {payingWithCash && (
            <ListItemText
              className={classes.cashListItem}
              primary={(
                <Input
                  id="cash-paid-text-field"
                  className={classes.cashInput}
                  value={cashRecieved}
                  onChange={handleCashInput}
                  disableUnderline
                  autoFocus
                  inputProps={{
                    style: {
                      textAlign: 'right',
                      padding: '6px 10px 7px',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }
                  }}
                  startAdornment={(
                    <InputAdornment position="start" style={{ marginLeft: '.8rem' }}>
                      {currency}
                    </InputAdornment>
                  )}
                />
              )}
            />
          )}
          {payingWithBank && (
            <ListItemText primary={(
              <Typography className={classes.totalSum}>
                {`${currency} ${totalToPay}`}
              </Typography>
            )}
            />
          )}
        </ListItem>
      </List>
      <Divider light className={classes.halfDivider} />
      {payingWithCash && (
        <List key="payment-change-list" className={classes.lists}>
          <ListItem key="change-due">
            <ListItemText
              primary={(
                <Typography className={classes.total}>
                  CHANGE DUE:
                </Typography>
              )}
              disableTypography
            />
            <ListItemText
              style={{ padding: 0 }}
              primary={(
                <Typography className={classes.totalSum}>
                  {`${currency} ${computedBalance}`}
                </Typography>
              )}
            />
          </ListItem>
        </List>
      )}
    </DialogContent>
  );
};

PaymentSummary.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  totalToPay: PropTypes.string.isRequired,
  balanceDue: PropTypes.number.isRequired,
  cashRecieved: PropTypes.string.isRequired,
  cashChecked: PropTypes.bool.isRequired,
  cardChecked: PropTypes.bool.isRequired,
  bankChecked: PropTypes.bool.isRequired,
  handleCashInput: PropTypes.func.isRequired,
  prefferedPayMethod: PropTypes.string.isRequired,
};

export default withStyles(styles)(PaymentSummary);
