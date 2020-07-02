import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, TextField, Typography, Paper
} from '@material-ui/core';
import FileUpload from './fileUpload';
import { BusinessSetUpStyles } from '../../assets/styles/setup';
import CustomCheckbox from '../shared/customCheckbox';
import CustomPhoneField from '../shared/customPhoneField';

const BusinessSetUp = (props) => {
  const {
    handleInPutChange,
    handleImageDrop,
    errorHandler,
    onSelectFile,
    onCropChange,
    handleClose,
    handleSave,
    handleCheckboxChange,
    state,
    handlePhoneChange,
  } = props;

  const {
    legalName,
    tradingName,
    businessEmail,
    addressLine1,
    addressLine2,
    phoneNumber,
    city,
    country,
    localGovernmentArea,
    website,
    twitter,
    instagram,
    logo,
    facebook,
    formError,
    boxChecked,
  } = state;

  const renderLabel = () => (
    <Grid item container>
      <Typography variant="caption">
        save &amp; complete later in &nbsp;
      </Typography>
      <Typography variant="caption" style={{ fontWeight: 500 }}>
        SETUP
      </Typography>
    </Grid>
  );

  return (
    <React.Fragment>
      <form style={{ padding: '40px' }}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={6}>
            <TextField
              required
              id="legalname"
              name="legalName"
              label="Legal Name"
              fullWidth
              autoComplete="legal name"
              value={legalName}
              error={legalName ? false : formError}
              helperText={legalName ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              id="tradingname"
              name="tradingName"
              label="Trading Name"
              fullWidth
              autoComplete="trading name"
              value={tradingName}
              error={tradingName ? false : formError}
              helperText={tradingName ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="addressLine1"
              label="Address line 1"
              fullWidth
              autoComplete="address-line1"
              value={addressLine1}
              error={addressLine1 ? false : formError}
              helperText={addressLine1 ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address2"
              name="addressLine2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
              value={addressLine2}
              onChange={handleInPutChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="Country"
              value={country}
              error={country ? false : formError}
              helperText={country ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="City"
              value={city}
              error={city ? false : formError}
              helperText={city ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="lga"
              name="localGovernmentArea"
              label="Region"
              fullWidth
              autoComplete="local Government Area"
              value={localGovernmentArea}
              onChange={handleInPutChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomPhoneField
              id="phone"
              name="phoneNumber"
              label="Primary Phone #"
              fullWidth
              autoComplete="Your phone #"
              error={phoneNumber ? false : formError}
              helperText={phoneNumber ? '' : errorHandler()}
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              id="email"
              name="businessEmail"
              label="Business Email"
              fullWidth
              autoComplete="Business Email"
              value={businessEmail}
              error={businessEmail ? false : formError}
              helperText={businessEmail ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="website"
              name="website"
              label="Website"
              fullWidth
              autoComplete="Your Website"
              style={BusinessSetUpStyles.textField}
              value={website}
              onChange={handleInPutChange}
            />
            <TextField
              id="twitter"
              name="twitter"
              label="Twitter"
              fullWidth
              autoComplete="Your twitter"
              style={BusinessSetUpStyles.textField}
              value={twitter}
              onChange={handleInPutChange}
            />
            <TextField
              id="facebook"
              name="facebook"
              label="Facebook"
              fullWidth
              autoComplete="Your facebook"
              style={BusinessSetUpStyles.textField}
              value={facebook}
              onChange={handleInPutChange}
            />
            <TextField
              id="instagram"
              name="instagram"
              label="Instagram"
              fullWidth
              autoComplete="Your Instagram"
              style={BusinessSetUpStyles.textField}
              value={instagram}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={2} style={BusinessSetUpStyles.paper}>
              <FileUpload
                state={state}
                handleImageDrop={handleImageDrop}
                logo={logo}
                onSelectFile={onSelectFile}
                onCropChange={onCropChange}
                handleClose={handleClose}
                handleSave={handleSave}
              />
            </Paper>
          </Grid>
          <Grid style={BusinessSetUpStyles.checkbox}>
            <CustomCheckbox
              checked={boxChecked}
              onChange={handleCheckboxChange}
              label={renderLabel()}
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

BusinessSetUp.propTypes = {
  handleInPutChange: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  handleImageDrop: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  onCropChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
};

export default BusinessSetUp;
