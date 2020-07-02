import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { stockFormStyles } from '../../../assets/styles/stock/addStockStyles';
import ManageSupplierSearchField from '../../searchField/ManageSupplierSearchField';

const EditBatchDetails = ({
  batchDetails: {
    quantity, expiryDate, supplier, unitCost, batchNo
  },
  renderTextField,
  handleChange, classes, handleSearchChange,
  currency, handleDateChange
}) => (
  <>
    <Grid item xs={4} style={stockFormStyles.gridWrappers}>
      <TextField
        label="Batch #"
        fullWidth
        name="batchNo"
        value={batchNo}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={4} style={stockFormStyles.gridWrappers}>
      <TextField
        label="Qty On Hand"
        type="number"
        fullWidth
        name="quantity"
        value={quantity}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={4} style={stockFormStyles.gridWrappers}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <InlineDatePicker
          id="date-due"
          onlyCalendar
          keyboard
          clearable
          fullWidth
          label="Expiry Date"
          name="expiryDate"
          value={expiryDate || new Date()}
          onChange={event => handleDateChange('expiryDate', event)}
          format="dd/MM/yyyy"
        />
      </MuiPickersUtilsProvider>
    </Grid>
    <Grid item xs={4} style={stockFormStyles.gridWrappers}>
      <ManageSupplierSearchField handleChange={handleSearchChange} supplierState={supplier} />
    </Grid>
    <Grid item xs={4} style={stockFormStyles.gridWrappers}>
      <TextField
        label="Cost Per Item"
        type="number"
        fullWidth
        name="unitCost"
        value={unitCost}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={4}>
      {renderTextField(
        classes.descriptionFields, 'total cost ', 'Total Cost', `${currency} ${unitCost * quantity}  `,
      )}
    </Grid>

  </>
);

EditBatchDetails.propTypes = {
  renderTextField: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  batchDetails: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  supplier: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default EditBatchDetails;
