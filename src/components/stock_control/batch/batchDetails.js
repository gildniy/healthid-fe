import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid
} from '@material-ui/core';
import EditBatchDetails from './editBatchDetails';
import ApprovedBatchDetails from './approvedBatchDetails';

const BatchDetails = (props) => {
  const {
    renderTextField, classes, currency, batchDetails, edit,
    handleChange, handleSearchChange, handleDateChange
  } = props;

  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Typography
          paragraph
          align="left"
          gutterBottom
          className={classes.dividerHeaders}
        >
          Batch Details
        </Typography>
      </div>

      <Grid container spacing={3} className={classes.containerGrid}>
        {edit ? (
          <EditBatchDetails
            renderTextField={renderTextField}
            classes={classes}
            currency={currency}
            batchDetails={batchDetails}
            handleChange={handleChange}
            handleSearchChange={handleSearchChange}
            handleDateChange={handleDateChange}
          />
        ) : (
          <ApprovedBatchDetails
            batchDetails={batchDetails}
            renderTextField={renderTextField}
            classes={classes}
            currency={currency}
          />
        )}
      </Grid>
    </Fragment>
  );
};

BatchDetails.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  batchDetails: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  renderTextField: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default BatchDetails;
