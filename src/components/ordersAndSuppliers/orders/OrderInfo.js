import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import supplierOrderStyles from '../../../assets/styles/orders/supplierOrderForm';

const OrderInfo = (props) => {
  const {
    deliveryDue, destinationOutlet, suppliersmetaSet,
    paymentDue, classes,
  } = props;
  const { creditDays } = suppliersmetaSet[0] ? suppliersmetaSet[0] : { creditDays: undefined };
  const {
    name: outletName,
    addressLine1,
    city: { name: city, country: { name: country } }
  } = destinationOutlet;
  return (
    <React.Fragment>
      <Grid
        container
        className={classes.orderInfoItem}
      >
        <Grid container item xs={3}>
          <Typography className={classes.orderInfoLabel}>Deliver To:</Typography>
        </Grid>
        <Grid container item xs={9}>
          <Typography className={classes.orderInfoValue}>
            {`${outletName}. ${addressLine1 || ''} ${city}, ${country}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.orderInfoItem}
      >
        <Grid container item xs={3}>
          <Typography className={classes.orderInfoLabel}>Delivery Due:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.orderInfoValue}>
            <Moment format="DD/MM/YYYY">
              {deliveryDue}
            </Moment>
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.orderInfoItem}>
        <Grid container item xs={3}>
          <Typography className={classes.orderInfoLabel}>Payment Due:</Typography>
        </Grid>
        <Grid container item xs={9}>
          {!creditDays > 0
            ? (
              <Typography className={classes.orderInfoValue}>
                <Moment format="DD/MM/YYYY">
                  {paymentDue}
                </Moment>
                <Grid container item xs={12}>
                  <Typography id="cod" className={classes.orderHelper}>
                    Cash On Delivery
                  </Typography>
                </Grid>
              </Typography>
            ) : (
              <Typography className={classes.orderInfoValue}>
                <Moment format="DD/MM/YYYY">{paymentDue}</Moment>
                <Typography id="creditDays" style={supplierOrderStyles.creditDays} className={classes.orderHelper}>
                  {`( ${creditDays} days credit)`}
                </Typography>
              </Typography>
            )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

OrderInfo.propTypes = {
  classes: PropTypes.instanceOf(Object),
  deliveryDue: PropTypes.string,
  destinationOutlet: PropTypes.instanceOf(Object),
  suppliersmetaSet: PropTypes.arrayOf(Object),
  paymentDue: PropTypes.string,
};

OrderInfo.defaultProps = {
  classes: {},
  deliveryDue: {},
  destinationOutlet: {},
  suppliersmetaSet: [],
  paymentDue: {},
};

export default OrderInfo;
