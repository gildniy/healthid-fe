import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose, graphql } from 'react-apollo';
import OrderHeader from './Templates/orderHeader';
import Footer from '../shared/Footer';
import ClosedOrderDetails from './Templates/closedOrderDetails';
import { orderDescriptionStyles } from '../../assets/styles/orders/orderDescriptionStyles';
import CLOSE_ORDER from '../../mutations/closeOrder';
import notify from '../shared/Toaster';
import Loader from '../shared/Loader';

export const OrderDetailRender = ({
  classes, receivedOrder, supplierOrderId, closeOrder, history
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const { status } = receivedOrder || {};
  const handleSubmitOrder = () => {
    setSubmitting(true);
    closeOrder({
      variables: {
        supplierOrderId
      }
    })
      .then(() => {
        notify('Order closed successfully');
        setSubmitting(false);
        history.push((status === 'CLOSED') ? '/orders/closed' : '/orders/pending-delivery');
      })
      .catch(() => {
        setSubmitting(false);
        notify('Error closing the order');
      });
  };

  const displayContent = status === 'CLOSED'
    ? (<OrderHeader classes={classes} previousPage="/orders/closed" />)
    : (
      <OrderHeader classes={classes} previousPage="/orders/pending-delivery">
        {submitting
          ? <Loader name="submitLoader" size={30} />
          : (
            <Button
              name="closeOrder"
              variant="contained"
              className={classes.closeOrderButton}
              onClick={handleSubmitOrder}
            >
              CLOSE ORDER
            </Button>
          )
        }
      </OrderHeader>
    );
  return (
    <React.Fragment>
      {displayContent}
      <ClosedOrderDetails
        classes={classes}
        receivedOrder={receivedOrder}
        supplierOrderId={supplierOrderId}
      />
      <Footer />
    </React.Fragment>
  );
};

OrderDetailRender.propTypes = {
  classes: PropTypes.instanceOf(Object),
  receivedOrder: PropTypes.instanceOf(Object),
  closeOrder: PropTypes.func.isRequired,
  supplierOrderId: PropTypes.string,
  history: PropTypes.instanceOf(Object),
};

OrderDetailRender.defaultProps = {
  classes: {},
  receivedOrder: {},
  supplierOrderId: '',
  history: {},
};

const COMPLETE_ORDER = graphql(CLOSE_ORDER, { name: 'closeOrder' });

export default compose(COMPLETE_ORDER)(
  withStyles(orderDescriptionStyles)(withRouter(OrderDetailRender))
);
