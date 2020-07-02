import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AllCaps } from '../../utils/capitalize';


const ApprovedBatchDetails = ({
  batchDetails: {
    quantity, expiryDate, supplier, unitCost, batchRef
  }, renderTextField, classes, currency
}) => (
  <>
    <Grid item xs={4}>
      {renderTextField(
        classes.descriptionFields, 'batch No', 'Batch #', batchRef.split('-')[0].toUpperCase()
      )}
    </Grid>
    <Grid item xs={4}>
      {renderTextField(
        classes.descriptionFields, 'qty ', 'Qty On Hand', quantity
      )}
    </Grid>
    <Grid item xs={4}>
      {renderTextField(
        classes.descriptionFields, 'expiryDate ', 'Expiry Date', expiryDate
      )}
    </Grid>
    <Grid item xs={4}>
      {renderTextField(
        classes.descriptionFields, 'supplier', 'Supplier', AllCaps(supplier.name)
      )}
    </Grid>
    <Grid item xs={4}>
      {renderTextField(
        classes.descriptionFields, 'cost per item ', 'Cost Per Item', `${currency} ${unitCost} `,
      )}
    </Grid>
    <Grid item xs={4}>
      {renderTextField(
        classes.descriptionFields, 'total cost ', 'Total Cost', `${currency} ${quantity * unitCost}  `,
      )}
    </Grid>
  </>
);

ApprovedBatchDetails.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  batchDetails: PropTypes.instanceOf(Object).isRequired,
  renderTextField: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,

};

export default ApprovedBatchDetails;
