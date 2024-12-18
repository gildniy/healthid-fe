import React, { Fragment } from 'react';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const SupplierInformation = (props) => {
  const {
    classes, renderTextField, supplier
  } = props;
  const { supplierMeta } = supplier;
  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Typography
          paragraph
          align="left"
          gutterBottom
          className={classes.dividerHeaders}
        >
          Supplier Information
        </Typography>
      </div>

      <Grid container spacing={3} className={classes.containerGrid}>
        <Grid item xs={4}>
          {renderTextField(
            classes.descriptionFields, 'tier', 'Tier', supplier.tier.name
          )}
        </Grid>
        <Grid item xs={4}>
          {renderTextField(
            classes.descriptionFields, 'paymentTerms', 'Payment Terms',
            supplierMeta.length && supplierMeta[0].paymentTerms
          )}
        </Grid>
        <Grid item xs={4}>
          {renderTextField(classes.newTextFields, 'creditDays', 'Credit Days',
            supplierMeta.length && supplierMeta[0].creditDays)}
        </Grid>
      </Grid>
    </Fragment>
  );
};

SupplierInformation.propTypes = {
  classes: PropTypes.shape({
    containerGrid: PropTypes.string,
    dividerHeaders: PropTypes.string,
    newTextFields: PropTypes.string,
    descriptionFields: PropTypes.string,
    dividerDiv: PropTypes.string,
  }).isRequired,
  renderTextField: PropTypes.func.isRequired,
  supplier: PropTypes.instanceOf(Object).isRequired
};

export default SupplierInformation;
