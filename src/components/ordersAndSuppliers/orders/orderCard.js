import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Typography, withStyles
} from '@material-ui/core';
import Checkbox from '../../shared/customCheckbox';
import style from '../../../assets/styles/orders/formCard';

export const OrderCard = ({
  orderForm, checked, check, classes
}) => {
  const {
    id: supplierOrderId, orderDetails
  } = orderForm;
  const data = orderDetails.map(item => ({
    status: item.status,
    supplier: item.supplier.name,
    order: item.order.orderNumber,
    products: orderDetails.length,
    link: `/orders/forms/${supplierOrderId}`
  }));
  const {
    status, supplier, order, products, link
  } = data[0];
  return (
    <Grid item xs={3} style={{ padding: 17 }}>
      <Paper elevation={2} style={style.paperBox}>
        <Grid style={{ textAlign: 'right' }}>
          <Checkbox
            checked={checked.includes(supplierOrderId)}
            handleChange={() => check(supplierOrderId)}
          />
        </Grid>
        <Paper
          elevation={2}
          className={classes.gridPaper}
          onClick={() => { window.location.href = link; }}
        >
          <Typography
            variant="h5"
            noWrap
            style={style.gridTitleSize}
          >
            {supplier}
          </Typography>
          <Typography variant="body1" style={style.gridTextSize}>
            {order.toUpperCase()}
          </Typography>
          <Typography variant="body1" style={{ ...style.gridTextSize, height: 30 }}>
            { products ? `${products} Product(s)` : '' }
          </Typography>
          <Typography variant="body2" style={style.gridFooter}>
            {status}
          </Typography>
        </Paper>
      </Paper>
    </Grid>
  );
};

OrderCard.propTypes = {
  orderForm: PropTypes.instanceOf(Object),
  checked: PropTypes.instanceOf(Array),
  check: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object),
  keyIndex: PropTypes.number,
};

OrderCard.defaultProps = {
  orderForm: {},
  checked: [],
  classes: {},
  keyIndex: 0
};

export default withStyles(style)(OrderCard);
