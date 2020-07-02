import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, TextField, MenuItem, Divider, Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import CustomSearchField from '../shared/customSearchField';
import { stockFormStyles } from '../../assets/styles/stock/addStockStyles';

const BatchForm = ({
  state, handleChange, displaySelected, popperClickAway, handleDateChange
}) => {
  const {
    productName, dateReceived, batchRef, supplier, expiryDate, costPerItem,
    quantityReceived, searching, active, errorText
  } = state;

  return (
    <Paper elevation={2}>
      <Grid container item>
        <Typography variant="h5" style={stockFormStyles.batchHeader}>
          Add Individual Product Batch
        </Typography>
      </Grid>
      <Divider style={stockFormStyles.batchDivider} />
      <Grid container style={stockFormStyles.gridContainer}>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <CustomSearchField
            state={state}
            value={productName}
            label="Product Name"
            name="productName"
            placeholder="Search product..."
            errorText={errorText}
            searching={searching}
            active={active}
            handleChange={handleChange}
            displaySelected={displaySelected}
            popperClickAway={popperClickAway}
            styles={stockFormStyles}
          />
        </Grid>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <InlineDatePicker
              id="date-due"
              onlyCalendar
              placeholder="dd/MM/yyyy"
              keyboard
              clearable
              fullWidth
              disablePast
              label="Date Received"
              name="dateReceived"
              value={dateReceived}
              onChange={event => handleDateChange('dateReceived', event)}
              format="dd/MM/yyyy"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <TextField
            label="Batch #"
            fullWidth
            name="batchRef"
            value={batchRef}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <CustomSearchField
            state={state}
            value={supplier}
            label="Supplier"
            name="supplier"
            placeholder="Search supplier..."
            errorText={errorText}
            searching={searching}
            active={active}
            handleChange={handleChange}
            displaySelected={displaySelected}
            popperClickAway={popperClickAway}
            styles={stockFormStyles}
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
              disablePast
              label="Expiry Date"
              name="expiryDate"
              value={expiryDate}
              onChange={event => handleDateChange('expiryDate', event)}
              format="dd/MM/yyyy"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <TextField
            label="Cost Per Item"
            type="number"
            fullWidth
            name="costPerItem"
            value={costPerItem}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <TextField
            label="Quantity Received"
            type="number"
            fullWidth
            name="quantityReceived"
            value={quantityReceived}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

BatchForm.propTypes = {
  state: PropTypes.objectOf(Object),
  displaySelected: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  popperClickAway: PropTypes.func.isRequired,
  handleServiceButtons: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired
};

BatchForm.defaultProps = {
  state: {},
};

export default BatchForm;
