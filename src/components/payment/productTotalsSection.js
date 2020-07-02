import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, List, ListItem, ListItemText,
  Divider, FormControlLabel, Radio
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const ProductTotalsSection = ({
  classes, discount, currency, computedTotal,
  computedSubTotal, computedDiscount, me,
  handleCashCollectedInput,
  handleCardCollectedInput,
  handleTransferCollectedInput,
  cardCollected, cashCollected, transferCollected, change, balance
}) => {
  return (
    <Fragment>
      <List className={classes.paymentMargins} key="sub-total-list">
        <ListItem key="subtotal" style={{ paddingBottom: 0, marginTop: '4px' }}>
          <ListItemText
            primary={(
              <Typography className={classes.sumHeaders}>
                SUBTOTAL:
              </Typography>
            )}
          />
          <ListItemText
            style={{ padding: 0 }}
            primary={(
              <Typography align="right" className={classes.sumHeaders}>
                {`${currency} ${computedSubTotal}`}
              </Typography>
            )}
          />
        </ListItem>
        <ListItem key="discount" style={{ paddingTop: 0, marginBottom: '4px' }}>
          <ListItemText
            className={classes.discountHeaders}
            primary={(
              <Fragment>
                <span key="discount-title">{`${discount}% `}</span>
                <span key="discount-value" className={classes.discountSpan}> DISCOUNT</span>
              </Fragment>
            )}
          />
          <ListItemText
            style={{ padding: 0 }}
            primary={(
              <Typography className={classes.discountTotal}>
                {`${currency}  ${'-'} ${computedDiscount}`}
              </Typography>
            )}
          />
        </ListItem>
      </List>
      <Divider light className={classes.halfDivider} style={{
        marginRight: '2.5rem',
        marginLeft: '2.5rem'
      }} />
      <List className={classes.paymentMargins} key="final-list">
        <ListItem key="total" style={{ marginTop: '4px' }}>
          <ListItemText
            primary={(
              <Typography variant="h6" className={classes.total}>
                AMOUNT TO PAY:
              </Typography>
            )}
            disableTypography
          />
          <ListItemText
            style={{ padding: 0 }}
            primary={(
              <Typography variant="h6" align="right" className={classes.total}>
                {`${currency} ${computedTotal}`}
              </Typography>
            )}
          />
        </ListItem>
        <ListItem 
          key="payment-methods"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div className={classes.paymentWayContainer}>
            <p className={classes.paymentWayName}>Cash</p>
            
            <div className={classes.paymentWay}>
              <span className={classes.paymentWayCurrency}>{ currency }</span>

              <input 
                className={classes.paymentWayInput}
                placeholder="0.00"
                type="number"
                onChange={handleCashCollectedInput}
                value={cashCollected}
              />
            </div>  
          </div>

          <div className={classes.paymentWayContainer}>
            <p className={classes.paymentWayName}>Card (POS)</p>
            
            <div className={classes.paymentWay}>
              <span className={classes.paymentWayCurrency}>{ currency }</span>

              <input className={classes.paymentWayInput} 
                placeholder="0.00"
                type="number"
                onChange={handleCardCollectedInput}
                value={cardCollected}
              />
            </div>  
          </div>

          <div className={classes.paymentWayContainer}>
            <p className={classes.paymentWayName}>Bank Transfer</p>
            
            <div className={classes.paymentWay}>
              <span className={classes.paymentWayCurrency}>{ currency }</span>

              <input 
                className={classes.paymentWayInput} 
                placeholder="0.00"
                type="number"
                onChange={handleTransferCollectedInput}
                value={transferCollected}
              />
            </div>  
          </div>

          <div className={classes.paymentWayContainer}>
            {/* <p className={classes.paymentWayName}>Store Credit</p>
            
            <div className={classes.paymentWay}>
              <span className={classes.paymentWayCurrency}>{ currency }</span>

              <input className={classes.paymentWayInput} placeholder="0.00"
              type="number" />
            </div>   */}
          </div>
        </ListItem>
        <ListItem key="total" style={{ marginBottom: '7px', marginTop: '4px' }}>
          <ListItemText
            primary={(
              <Typography style={{
                color: '#424242',
                fontSize: '16px',
                fontWeight: '300'
              }}>
                BALANCE DUE:
              </Typography>
            )}
            disableTypography
          />
          <ListItemText
            style={{ padding: 0 }}
            primary={(
              <Typography variant="h6" align="right" style={{
                color: '#424242',
                fontSize: '16px',
                fontWeight: '300'
              }}>
                {`${currency} ${balance}`}
              </Typography>
            )}
          />
        </ListItem>
        <Divider light className={classes.halfDivider} />
        <ListItem key="total" style={{ marginBottom: '4px', marginTop: '12px' }}>
          <ListItemText
            primary={(
              <Typography variant="h6" className={classes.total}>
                CHANGE DUE:
              </Typography>
            )}
            disableTypography
          />
          <ListItemText
            style={{ padding: 0 }}
            primary={(
              <Typography variant="h6" align="right" className={classes.total}>
                {`${currency} ${change}`}
              </Typography>
            )}
          />
        </ListItem>
      </List>
      <Divider />
    </Fragment>
  );
};

ProductTotalsSection.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  cardChecked: PropTypes.bool.isRequired,
  cashChecked: PropTypes.bool.isRequired,
  bankChecked: PropTypes.bool.isRequired,
  computedTotal: PropTypes.string.isRequired,
  computedSubTotal: PropTypes.string.isRequired,
  computedDiscount: PropTypes.string.isRequired,
  handlePaymentType: PropTypes.func.isRequired,
  me: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(salesDialogStyles)(ProductTotalsSection);
