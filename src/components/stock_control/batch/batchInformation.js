import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

export const BatchInformation = (props) => {
  const {
    renderTextField, classes, edit, handleDateChange,
    batchDetails: { dateReceived }
  } = props;

  return (
    <Grid
      container
      spacing={3}
      className={classes.containerGrid}
    >
      <Grid item xs={4}>
        {edit ? (
          <div style={{ marginTop: '.85rem' }}>
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
          </div>
        ) : (
          <div style={{ marginBottom: '30px', marginTop: '15px' }} className={classes.category}>
            {renderTextField(
              classes.descriptionFields,
              'supplier',
              'Date Received',
              dateReceived
            )}
          </div>
        )}

      </Grid>
    </Grid>
  );
};

BatchInformation.propTypes = {
  renderTextField: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  batchDetails: PropTypes.instanceOf(Object)
};

BatchInformation.defaultProps = {
  batchDetails: {
    dateReceived: ''
  }
};

export default BatchInformation;
