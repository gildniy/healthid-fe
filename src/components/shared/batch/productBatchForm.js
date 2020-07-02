import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, TextField, Typography, Button,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import {
  ModalStyles, stockFormStyles, OrderDetailStyles
} from '../../../assets/styles/modal/modalStyles';
import Loader from '../Loader';
import CustomSearchField from '../customSearchField';

const ProductBatchForm = ({
  state, singleBatch, handleCloseDialog, handleInputChange,
  handleSearchChange, handleSaveChanges, orderName,
  displaySelected, popperClickAway, handleDateChange
}) => {
  useEffect(() => {
    state.supplier = (singleBatch.supplier !== '')
      ? singleBatch.supplier
      : state.supplier;
  }, []);

  const {
    batchNo, costPerItem, dateReceived, expiryDate,
    quantityReceived, submitting, productName
  } = singleBatch;
  const {
    errorText, supplier, active, searching
  } = state;

  const allValues = [
    dateReceived, quantityReceived,
    expiryDate, costPerItem
  ];

  const someMissing = allValues.some(val => (!val || val === ''));

  return (
    <Paper elevation={2}>
      <Grid style={ModalStyles.editHeader}>
        <Typography style={OrderDetailStyles.title}>
          <span style={{ opacity: '1', fontWeight: 'bold', marginRight: '20px' }}>
            { productName }
            {' '}
          </span>
          <span style={{ opacity: '0.7', fontWeight: 'bold' }}>{`( ${orderName} )` }</span>
        </Typography>
      </Grid>
      <Grid container style={stockFormStyles.gridContainer2}>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <InlineDatePicker
              id="date-due"
              onlyCalendar
              keyboard
              clearable
              fullWidth
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
            name="batchNo"
            value={batchNo}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <CustomSearchField
            required
            state={state}
            value={supplier}
            label="Supplier"
            name="supplier"
            placeholder="Search supplier..."
            errorText={errorText}
            searching={searching}
            active={active}
            handleChange={handleSearchChange}
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
            required
            label="Cost Per Item"
            type="number"
            fullWidth
            name="costPerItem"
            value={costPerItem}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4} style={stockFormStyles.gridWrappers}>
          <TextField
            required
            label="Quantity Received"
            type="number"
            fullWidth
            name="quantityReceived"
            value={quantityReceived}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid item container style={OrderDetailStyles.buttonContainer} justify="flex-end">
        <Button style={OrderDetailStyles.cancelButton} onClick={handleCloseDialog}>
          Cancel
        </Button>
        { submitting ? <Loader name="submitLoader" size={30} />
          : (
            <Button
              onClick={handleSaveChanges}
              size="medium"
              style={OrderDetailStyles.saveButton}
              variant="contained"
              color="secondary"
              name="submit"
              disabled={someMissing}
            >
              add batch
            </Button>
          )
        }
      </Grid>
    </Paper>
  );
};


ProductBatchForm.propTypes = {
  state: PropTypes.objectOf(Object),
  singleBatch: PropTypes.objectOf(Object),
  handleCloseDialog: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  displaySelected: PropTypes.func.isRequired,
  popperClickAway: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  orderName: PropTypes.string.isRequired,
};

ProductBatchForm.defaultProps = {
  state: {},
  singleBatch: {}
};

export default ProductBatchForm;
