import React, { Fragment } from 'react';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FieldTitle, getFields } from './SupplierFields';
import capitalize from '../../utils/capitalize';

const SupplierInformation = (props) => {
  const {
    classes, supplier, currentSupplier
  } = props;
  const { supplierMeta } = supplier;
  const { suppliersmetaSet } = currentSupplier;

  const enteredFields = {
    tier: supplier.tier.name,
    paymentTerms: supplierMeta[0] && supplierMeta[0].paymentTerms
      .split('_').map(word => capitalize(word)).join(' '),
    creditDays: supplierMeta[0] && `${supplierMeta[0].creditDays} Days`
  };
  const currentFields = {
    tier: capitalize(currentSupplier.tier.name),
    paymentTerms: suppliersmetaSet[0] && suppliersmetaSet[0].paymentTerms
      .split('_').map(word => capitalize(word)).join(' '),
    creditDays: suppliersmetaSet[0] && `${suppliersmetaSet[0].creditDays} Days`
  };

  const FieldValues = getFields(currentFields, enteredFields, classes);
  const { fieldsChanged } = FieldValues;

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

      <Grid container spacing={24} className={classes.containerGrid}>
        <Grid item xs={4}>
          <FieldTitle changed={'tier' in fieldsChanged} title="Tier" classes={classes} />
          <FieldValues.Render name="tier" />
        </Grid>
        <Grid item xs={4}>
          <FieldTitle changed={'paymentTerms' in fieldsChanged} title="Payment Terms" classes={classes} />
          <FieldValues.Render name="paymentTerms" />
        </Grid>
        <Grid item xs={4}>
          <FieldTitle changed={'creditDays' in fieldsChanged} title="Credit Days" classes={classes} />
          <FieldValues.Render name="creditDays" />
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
  supplier: PropTypes.instanceOf(Object).isRequired,
  currentSupplier: PropTypes.instanceOf(Object).isRequired
};

export default SupplierInformation;
