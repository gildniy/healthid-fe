import React, { Fragment } from 'react';
import {
  Dialog, DialogContent, DialogTitle, Slide, Typography
} from '@material-ui/core';
import moment from 'moment';
import 'moment-precise-range-plugin';
import Moment from 'react-moment';
import { customerDetailsDialog as styles } from '../../../assets/css/sellScreenStyles';
import ContactDetails from './contactDetails';
import EmergencyContact from './emergencyContact';
import LoyaltyPaper from './loyaltyPaper';
import ContactHeader from './contactHeader';
import CustomerActionTypes from '../../../providers/reducers/customers/customerTypes';

import { useStateValue } from '../../../providers/stateProvider';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const CustomerDetailDialog = () => {
  const [{ customers }, dispatch] = Object.values(useStateValue());

  const { openCustomerDetailsDialog } = customers;

  const dataRangeHuman = (start) => {
    const starts = moment(start);
    const ends = moment();
    const diff = moment.preciseDiff(starts, ends);
    if (diff.includes('days')) {
      return diff.split(/(?<=days)/)[0];
    }
    return diff.split(/(?<=months)/)[0];
  };
  const renderDateRange = createdAt => (
    <Fragment>
      <Moment format="DD/MM/YYYY" style={styles.momentDate}>
        {createdAt}
      </Moment>
      <Typography variant="caption" style={styles.captionText}>
        &nbsp;
        {`(${dataRangeHuman(createdAt)} ago)`}
      </Typography>
    </Fragment>
  );

  const handleEditSelectedCustomer = () => {
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: { openDialog: true, openCustomerDetailsDialog: false }
    });
  };

  const handleCustomerDialogClose = () => {
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: {
        openCustomerDetailsDialog: false,
        firstName: '',
        lastName: '',
        isSelected: '',
        email: '',
        primaryMobileNumber: '',
        secondaryMobileNumber: '',
        loyaltyMember: false,
        region: '',
        emergencyContactName: '',
        emergencyContactEmail: '',
        emergencyContactNumber: ''
      }
    });
  };

  return (
    <Dialog
      open={openCustomerDetailsDialog}
      onClose={handleCustomerDialogClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      aria-labelledby="customer-details-dialog"
      id="customer-details-dialog"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={styles.dialogTitle}
      >
        <ContactHeader
          state={customers}
          renderDateRange={renderDateRange}
          handleEditSelectedCustomer={handleEditSelectedCustomer}
          dataRangeHuman={dataRangeHuman}
        />
      </DialogTitle>
      <DialogContent style={styles.dialogContent}>
        <LoyaltyPaper
          state={customers}
        />
        <ContactDetails
          state={customers}
          renderDateRange={renderDateRange}
        />
        <EmergencyContact
          state={customers}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
