import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Divider,
  Typography,
  TextField,
  Grid,
  IconButton
} from '@material-ui/core';
import { Done, Close, Create } from '@material-ui/icons';
import SupplierDescription from './SupplierDescription';
import SupplierInformation from './SupplierInformation';
import { supplierDetailStyles } from '../../../assets/styles/suppliers/supplierDetail';
import VersionStyles from '../../../assets/styles/suppliers/versionStyles';

export const renderTextField = (style, name, label, value) => (
  <TextField
    className={style}
    id={name}
    name={name}
    label={label}
    value={value}
    fullWidth
    InputProps={{ disableUnderline: true, readOnly: true }}
  />
);

export const VersionDetails = ({
  classes, supplier, handleApproveVersion, handleRejectVersion, currentSupplier, activeOutlet
}) => (
  <>
    <Grid container style={VersionStyles.versionHeader}>
      <Grid item xs={9}>
        <Typography variant="h6" style={{ padding: '12px 0' }}>
          {`${supplier.name} Version ${supplier.submitTime}`}
        </Typography>
      </Grid>
      <Grid item xs={3} style={VersionStyles.dialogIcons}>
        <IconButton
          style={{ height: 'fit-content', margin: 'auto' }}
          aria-label="Create"
        >
          <Create fontSize="large" />
        </IconButton>
        <IconButton
          style={{ height: 'fit-content', margin: 'auto' }}
          aria-label="Close"
          onClick={() => handleRejectVersion(supplier.id)}
        >
          <Close fontSize="large" />
        </IconButton>
        <IconButton
          style={{ height: 'fit-content', margin: 'auto' }}
          aria-label="Done"
          onClick={() => handleApproveVersion(supplier.id)}
        >
          <Done fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
    <Divider />

    <SupplierDescription
      classes={classes}
      currentSupplier={currentSupplier}
      supplier={supplier}
      image="image.png"
      activeOutlet={activeOutlet}
    />

    <div style={{ height: '30px' }} />

    <SupplierInformation
      classes={classes}
      currentSupplier={currentSupplier}
      supplier={supplier}
    />
  </>
);

VersionDetails.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  currentSupplier: PropTypes.instanceOf(Object).isRequired,
  supplier: PropTypes.instanceOf(Object).isRequired,
  handleApproveVersion: PropTypes.func.isRequired,
  handleRejectVersion: PropTypes.func.isRequired,
  activeOutlet: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(supplierDetailStyles)(VersionDetails);
