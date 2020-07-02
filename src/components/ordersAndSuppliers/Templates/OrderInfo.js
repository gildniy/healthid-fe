import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const OrderInfo = ({
  classes, receivedOrder,
}) => {
  const {
    order: { destinationOutlet, user, createdAt },
    supplier: { suppliersmetaSet },
    paymentDue,
    deliveryDue
  } = receivedOrder.orderDetails[0];
  const { name: outletName, addressLine1, city } = destinationOutlet;
  const { name: cityName, country: { name: countryName } } = city;
  const address = addressLine1 ? `${addressLine1}, ` : '';
  const deliverTo = `${outletName}. ${address}${cityName}, ${countryName}`;
  return (
    <React.Fragment>
      <Grid
        container
        className={classes.orderInfoItem}
      >
        <Grid container item xs={3}>
          <Typography className={classes.orderInfoLabel}>Delivered To:</Typography>
        </Grid>
        <Grid container item xs={9}>
          <Typography className={classes.orderInfoValue}>
            {deliverTo}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.orderInfoValue}
      >
        <Grid container item xs={3}>
          <Typography className={classes.orderInfoLabel}>Received By:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.orderInfoValue}>
            {user.firstName}
            {' '}
            {user.lastName}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.orderInfoItem}>
        <Grid container item xs={3}>
          <Typography className={classes.orderInfoLabel}>Date Received:</Typography>
        </Grid>
        <Grid container item xs={9}>
          <Typography className={classes.orderInfoValue}>
            <Moment format="DD/MM/YYYY HH:mm">
              {createdAt}
            </Moment>
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.orderInfoItem}>
        <Grid container item xs={3}>
          <Typography className={classes.orderInfoLabel}>Payment Due:</Typography>
        </Grid>
        <Grid container item xs={9}>
          {suppliersmetaSet[0] === undefined
          || suppliersmetaSet[0].creditDays === 0
            ? (
              <Typography className={classes.orderInfoValue}>
                <Moment format="DD/MM/YYYY">
                  {deliveryDue}
                </Moment>
                <Grid container item xs={12}>
                  <Typography className={classes.orderHelper}>
                    Cash On Delivery
                  </Typography>
                </Grid>
              </Typography>
            ) : (
              <Typography className={classes.orderInfoValue}>
                <Moment format="DD/MM/YYYY">{paymentDue}</Moment>
                <Grid container item xs={12}>
                  <Typography className={classes.orderHelper}>
                    {suppliersmetaSet[0].creditDays}
                    {' '}
                    days credit
                  </Typography>
                </Grid>
              </Typography>
            )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

OrderInfo.propTypes = {
  classes: PropTypes.shape({
    orderHelper: PropTypes.string,
    orderInfoLabel: PropTypes.string,
    orderInfoValue: PropTypes.string,
    invoiceLabel: PropTypes.string,
    orderInfoItem: PropTypes.string
  }).isRequired,
  receivedOrder: PropTypes.instanceOf(Object).isRequired,
};

export default OrderInfo;
