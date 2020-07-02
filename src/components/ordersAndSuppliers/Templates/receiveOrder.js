import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Paper, Grid, TextField, Typography, Divider
} from '@material-ui/core';
import notify from '../../shared/Toaster';
import MARK_SUPPLIER_ORDER_RECEIVED from '../../../mutations/orders/marksupplierOrderReceived';
import ServiceQuality from '../../stock_control/returnServiceQuality';
import DeliveryPrompt from '../../shared/batch/DeliveryPrompt';
import {
  receiveOrderStyles
} from '../../../assets/styles/orders/orderDescriptionStyles';
import CustomHeader from './customHeader';
import { Capitalize } from './helpers';

export const ReceiveOrder = ({
  SupplierOrderReceived, classes, supplierOrderId,
  receivedOrder
}) => {
  const initialState = {
    loading: false,
    deliveryPromptness: '',
    notes: '',
    serviceQuality: '',
    editable: true
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const {
      status,
      deliveryPromptness,
      serviceQuality,
      additionalNotes
    } = receivedOrder;
    const promptness = deliveryPromptness ? 'On Time' : 'Late';
    const editable = status !== 'RECEIVED' && status !== 'CLOSED';
    setState({
      ...state,
      deliveryPromptness: promptness,
      serviceQuality,
      notes: additionalNotes,
      editable
    });
  }, []);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleServiceButtons = (id) => {
    setState({ ...state, serviceQuality: id });
  };

  const handleSaveChanges = () => {
    const {
      deliveryPromptness, notes, serviceQuality
    } = state;
    const promptness = deliveryPromptness === 'On Time';
    setState({ ...state, loading: true });
    SupplierOrderReceived({
      variables: {
        supplierOrderId,
        deliveryPromptness: promptness,
        additionalNotes: notes,
        serviceQuality
      }
    }).then((resp) => {
      const { message } = resp.data.markSupplierOrderAsRecieved || '';
      setState({ ...state, loading: false, editable: false });
      notify(message);
    }).catch((error) => {
      setState({ ...state, loading: false });
      notify(error.message.slice(14));
    });
  };

  const editReceiveOrder = () => {
    setState({ ...state, editable: true });
  };

  const {
    deliveryPromptness, serviceQuality, loading, notes,
    editable
  } = state;
  const someMissing = [deliveryPromptness, serviceQuality].some(
    val => (!val || val === '')
  );
  const header = editable ? 'Receive Order' : 'Received Order';
  return (
    <Paper elevation={2} square className={classes.paper}>
      <CustomHeader
        classes={classes}
        header={header}
        someMissing={someMissing}
        loading={loading}
        handleUpdate={handleSaveChanges}
        editable={editable}
        editReceiveOrder={editReceiveOrder}
      />
      <Divider light />
      <Grid container className={classes.containerGrid}>
        <DeliveryPrompt
          styles={receiveOrderStyles}
          deliveryPromptness={deliveryPromptness}
          handleChange={handleInputChange}
          editable={editable}
        />
        <ServiceQuality
          styles={receiveOrderStyles}
          handleServiceButtons={handleServiceButtons}
          serviceQuality={serviceQuality}
          editable={editable}
        />
        <Grid container style={receiveOrderStyles.gridContainer}>
          <Grid item xs={11}>
            <Typography variant="subtitle1">Delivery Notes</Typography>
            {editable
              ? (
                <TextField
                  required
                  fullWidth
                  name="notes"
                  variant="outlined"
                  multiline
                  rows="3"
                  value={notes}
                  onChange={handleInputChange}
                />
              ) : (
                <Typography variant="subtitle1" style={receiveOrderStyles.notes}>
                  {notes && Capitalize(notes)}
                </Typography>
              )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

ReceiveOrder.propTypes = {
  classes: PropTypes.objectOf(Object),
  receivedOrder: PropTypes.objectOf(Object),
  supplierOrderId: PropTypes.string,
  SupplierOrderReceived: PropTypes.func.isRequired,
};

ReceiveOrder.defaultProps = {
  classes: {},
  receivedOrder: {},
  supplierOrderId: ''
};

const SUPPLIER_ORDER_RECEIVED = graphql(
  MARK_SUPPLIER_ORDER_RECEIVED, { name: 'SupplierOrderReceived' }
);

export default compose(
  SUPPLIER_ORDER_RECEIVED
)(ReceiveOrder);
