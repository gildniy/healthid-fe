import React, { Fragment, useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Modal from '@material-ui/core/Modal';
import {
  Paper, Grid, Typography, TextField, Button, Select, MenuItem, InputLabel
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { ModalStyles, OrderDetailStyles } from '../../assets/styles/orders/order';
import { CustomIconButton } from '../../components/stock_control/utils/utils';
import editProductIcon from '../../assets/images/stock/edit.png';
import withAuth from '../../components/withAuth';
import notify from '../../components/shared/Toaster';

import UPDATE_ORDER_DETAILS from '../../mutations/updateOrderDetailsMutation';

export const EditOrderDetails = (props) => {
  const {
    orderDetails, session, updateOrderDetails, orderId, outlet
  } = props;

  const [open, setOpen] = useState(false);
  const [orderOutletId, setOrderOutletId] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderDue, setOrderDue] = useState('');
  const [currentOutlets, setCurrentOutlets] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setOrderName(event.target.value);
  };

  const handleOutletChange = (event) => {
    setOrderOutletId(event.target.value);
  };

  const handleDueChange = (event) => {
    const value = new Date(event).toISOString().split('T')[0];
    setOrderDue(value);
  };

  const { name, deliveryDate } = orderDetails;
  const { outlets } = session.me;

  useEffect(() => {
    setOrderName(name);
    setOrderDue(deliveryDate);
    setOrderOutletId(outlet.id);
    setCurrentOutlets(outlets);
  }, [session, name, deliveryDate]);

  const handleEdit = () => updateOrderDetails({
    variables: {
      orderId,
      orderName,
      orderDue,
      outletId: orderOutletId
    }
  }).then(() => {
    notify('Order Details Updated');
    setOpen(false);
  }).catch((error) => {
    notify(error.message.slice(14));
  });

  return (
    <Fragment>
      <CustomIconButton
        toolTip="Edit order details"
        onClickHandler={handleOpen}
      >
        <img src={editProductIcon} style={OrderDetailStyles.editIcon} alt="edit" />
      </CustomIconButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableAutoFocus
        disableRestoreFocus
        open={open}
        onClose={handleClose}
      >
        <Paper elevation={2} style={OrderDetailStyles.wrapper}>
          <Grid>
            <Grid style={ModalStyles.editHeader}>
              <Typography style={OrderDetailStyles.title}>Edit Order Information</Typography>
            </Grid>
            <Grid style={OrderDetailStyles.orderNameContainer}>
              <Grid>
                <TextField id="standard-basic" label="Order Name" value={orderName} onChange={handleNameChange} style={OrderDetailStyles.textField} />
              </Grid>
            </Grid>
            <Grid container style={OrderDetailStyles.orderOutletDueContainer}>
              <Grid item style={OrderDetailStyles.outletContainer}>
                <Grid>
                  <InputLabel id="demo-simple-select-helper-label" style={OrderDetailStyles.label}>Deliver To</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={orderOutletId}
                    onChange={handleOutletChange}
                    style={OrderDetailStyles.select}
                  >
                    {
                      currentOutlets && currentOutlets.map(currentOutlet => (
                        <MenuItem
                          key={currentOutlet.id}
                          value={currentOutlet.id}
                          style={OrderDetailStyles.menu}
                        >
                          <Grid container justify="space-between">
                            <Grid item style={OrderDetailStyles.outletName}>
                              {currentOutlet.name}
                            </Grid>
                            <Grid item style={OrderDetailStyles.outletId}>{`ID ${currentOutlet.id}`}</Grid>
                          </Grid>
                        </MenuItem>
                      ))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Grid item style={OrderDetailStyles.dueContainer}>
                <Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <InlineDatePicker
                      id="date-due"
                      onlyCalendar
                      keyboard
                      clearable
                      fullWidth
                      label="Delivery Due"
                      name="orderDue"
                      value={orderDue}
                      onChange={event => handleDueChange(event)}
                      format="dd/MM/yyyy"
                      style={OrderDetailStyles.dueTextField}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid style={OrderDetailStyles.buttonContainer}>
                <Button style={OrderDetailStyles.cancelButton} onClick={handleClose}>
                  Cancel Edit
                </Button>
                <Button style={OrderDetailStyles.saveButton} onClick={handleEdit}>
                  Save Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Fragment>
  );
};

EditOrderDetails.propTypes = {
  orderDetails: PropTypes.instanceOf(object).isRequired,
  session: PropTypes.shape({
    me: PropTypes.shape({
      businessUser: PropTypes.instanceOf(object).isRequired,
      outlets: PropTypes.array,
    })
  }).isRequired,
  updateOrderDetails: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  outlet: PropTypes.instanceOf(object).isRequired
};

const UPDATE_ORDER_DETAILS_MUTATION = graphql(UPDATE_ORDER_DETAILS, { name: 'updateOrderDetails' });

export default compose(UPDATE_ORDER_DETAILS_MUTATION)(withAuth(EditOrderDetails));
