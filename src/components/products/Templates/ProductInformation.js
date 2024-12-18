import React, { Fragment } from 'react';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const ProductInformation = (props) => {
  const {
    classes, renderTextField, dispensingSize, loyaltyWeight, preferredSupplier,
    backupSupplier, id, skuNumber, vatStatus, manufacturer, brand
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
          Product Information
        </Typography>
      </div>

      <Grid container spacing={3} className={classes.containerGrid}>
        <Grid item xs={4}>
          {renderTextField(
            classes.descriptionFields, 'productId', 'Product ID', id
          )}
        </Grid>
        <Grid item xs={4}>
          {renderTextField(
            classes.descriptionFields, 'skuNumber', 'SKU', skuNumber || 'Null'
          )}
        </Grid>
        <Grid item xs={4}>
          {renderTextField(classes.newTextFields, 'brand', 'Brand', brand)}

        </Grid>
        <Grid item xs={4}>
          {renderTextField(
            classes.descriptionFields, 'manufacturer', 'Manufacturer', manufacturer
          )}
        </Grid>
        <Grid item xs={4}>
          {renderTextField(
            classes.newTextFields, 'preferredSupplier', 'Preferred Supplier',
            preferredSupplier.name
          )}
        </Grid>
        <Grid item xs={4}>

          {renderTextField(
            classes.newTextFields, 'backupSupplier', 'Backup Supplier',
            (backupSupplier) ? backupSupplier.name : 'Not Available'
          )}
        </Grid>
        <Grid item xs={4}>
          {renderTextField(
            classes.descriptionFields, 'dispensingSize', 'Dispensing Size',
            (dispensingSize) ? dispensingSize.name : 'Not Available'
          )}
        </Grid>
        <Grid item xs={4}>
          {renderTextField(
            classes.newTextFields, 'loyaltyWeight', 'Loyalty Weight',
            loyaltyWeight
          )}
        </Grid>
        <Grid item xs={4}>
          {renderTextField(classes.newTextFields, 'vatStatus', 'VAT Status', vatStatus)}
        </Grid>
      </Grid>
    </Fragment>
  );
};
ProductInformation.defaultProps = {
  backupSupplier: { name: '' }
};
ProductInformation.propTypes = {
  classes: PropTypes.shape({
    containerGrid: PropTypes.string,
    dividerHeaders: PropTypes.string,
    newTextFields: PropTypes.string,
    descriptionFields: PropTypes.string,
    dividerDiv: PropTypes.string,
  }).isRequired,
  renderTextField: PropTypes.func.isRequired,
  dispensingSize: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  loyaltyWeight: PropTypes.number.isRequired,
  preferredSupplier: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  backupSupplier: PropTypes.shape({
    name: PropTypes.string
  }),
  id: PropTypes.string.isRequired,
  skuNumber: PropTypes.string.isRequired,
  vatStatus: PropTypes.bool.isRequired,
  manufacturer: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired
};

export default ProductInformation;
