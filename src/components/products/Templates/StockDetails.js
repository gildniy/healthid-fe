import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';


const StockDetails = (props) => {
  const {
    classes,
    renderTextField,
    salesPrice,
    reorderMax,
    reorderPoint,
    nearestExpiryDate,
    quantityInStock
  } = props;
  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Typography
          paragraph
          variant="h6"
          align="left"
          gutterBottom
          className={classes.dividerHeaders}
        >
          Stock Details
        </Typography>
      </div>

      <Grid container spacing={3} className={classes.containerGrid}>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(classes.newTextFields, 'quantity', 'Qty in Stock', quantityInStock || 0)}
        </Grid>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(classes.newTextFields, 'reorderPoint', 'Re-order Point', reorderPoint)}
        </Grid>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(classes.newTextFields, 'reorderMax', 'Re-order Max', reorderMax)}
        </Grid>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(classes.newTextFields, 'salesPrice', 'Sales Price', salesPrice || 0)}
        </Grid>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(
            classes.newTextFields,
            'nearestExpiryDate',
            'Nearest Expiry Date',
            nearestExpiryDate || 'None'
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

StockDetails.propTypes = {
  quantityInStock: PropTypes.number.isRequired,
  salesPrice: PropTypes.number.isRequired,
  reorderMax: PropTypes.number,
  reorderPoint: PropTypes.number,
  nearestExpiryDate: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  renderTextField: PropTypes.func.isRequired,
};

StockDetails.defaultProps = {
  reorderMax: 1,
  reorderPoint: 1
};

export default StockDetails;
