import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, Slide, TextField, Grid, Typography, Divider,
  FormControlLabel, Switch,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Loader from '../Loader';
import { addCustomerDialog } from '../../../assets/css/sellScreenStyles';
import RenderCustomSelectField from '../renderCustomSelectField';
import CustomPhoneField from '../customPhoneField';

const styles = addCustomerDialog;

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const RenderCustomerDialog = ({
  customers,
  countries,
  handleButton,
  handleInputChange,
  handleCountryInput,
  handleCityInput,
  handlePrimaryPhoneChange,
  handleSecondaryPhoneChange,
  handleContactPhoneChange,
  handleCustomerDialogClose,
  validateCustomerDialogInputs
}) => {
  const {
    openDialog,
    firstName,
    lastName,
    email,
    primaryMobileNumber,
    secondaryMobileNumber,
    loyaltyMember,
    isLoading,
    nameHelper,
    emailHelper,
    mobileHelper,
    nameError,
    emailError,
    mobileError,
    address,
    region,
    city,
    cities,
    country,
    emergencyContactName,
    emergencyContactEmail,
    emergencyContactNumber,
    isSelected,
  } = customers;

  return (
    <Dialog
      open={openDialog}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      aria-labelledby="add-customer-dialog"
      id="add-customer-dialog"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={addCustomerDialog.dialogTitle}
      >
        {!isSelected ? 'Add New Customer' : 'Edit Customer'}
      </DialogTitle>
      <form onSubmit={event => handleButton(event)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6} style={addCustomerDialog.dialogContentGrid}>
              <TextField
                id="firstname"
                name="firstName"
                label="First Name"
                required
                margin="dense"
                fullWidth
                value={firstName}
                error={nameError}
                helperText={nameHelper}
                onChange={handleInputChange}
              />
              <Grid container item>
                <CustomPhoneField
                  value={primaryMobileNumber}
                  label="Mobile #"
                  onChange={handlePrimaryPhoneChange}
                />
                <Typography variant="caption" style={addCustomerDialog.phoneInputHelper}>
                  {primaryMobileNumber && mobileError ? mobileHelper : ''}
                </Typography>
              </Grid>
              <TextField
                id="email"
                name="email"
                label="Email"
                margin="dense"
                fullWidth
                value={email}
                error={email ? emailError : false}
                helperText={email && emailHelper}
                onChange={handleInputChange}
              />
              <div style={{ marginTop: '5px' }}>
                <RenderCustomSelectField
                  options={countries}
                  label="Country"
                  value={country}
                  handleOptionChange={handleCountryInput}
                />
              </div>
            </Grid>
            <Grid item xs={6} style={addCustomerDialog.dialogContentGrid}>
              <TextField
                id="lastname"
                name="lastName"
                label="Last Name"
                margin="dense"
                fullWidth
                value={lastName}
                onChange={handleInputChange}
              />
              <Grid container item>
                <CustomPhoneField
                  value={secondaryMobileNumber}
                  label="Other Phone #"
                  onChange={handleSecondaryPhoneChange}
                />
                <Typography variant="caption" style={addCustomerDialog.phoneInputHelper}>
                  {secondaryMobileNumber && mobileError ? mobileHelper : ''}
                </Typography>
              </Grid>
              <TextField
                id="address"
                name="address"
                label="Address"
                margin="dense"
                fullWidth
                value={address}
                onChange={handleInputChange}
              />
              <div style={{ marginTop: '5px' }}>
                <RenderCustomSelectField
                  options={cities}
                  label="City/Town"
                  value={city}
                  handleOptionChange={handleCityInput}
                />
              </div>
            </Grid>
            <Grid item xs={6} style={addCustomerDialog.dialogContentGrid}>
              <TextField
                id="region"
                name="region"
                label="Region"
                margin="dense"
                fullWidth
                value={region}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={loyaltyMember}
                    name="loyaltyMember"
                    onChange={handleInputChange}
                    color="primary"
                  />
                )}
                label="Loyalty member?"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Emergency Contact Information</Typography>
              <Divider />
            </Grid>
            <Grid item xs={6} style={addCustomerDialog.dialogContentGridTop}>
              <TextField
                id="emergencycontactname"
                name="emergencyContactName"
                label="Contact Name"
                margin="dense"
                fullWidth
                value={emergencyContactName}
                onChange={handleInputChange}
              />
              <TextField
                id="emergencycontactemail"
                name="emergencyContactEmail"
                label="Contact Email"
                margin="dense"
                fullWidth
                value={emergencyContactEmail}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} style={addCustomerDialog.dialogContentGridTop}>
              <CustomPhoneField
                value={emergencyContactNumber}
                label="Contact Number"
                onChange={handleContactPhoneChange}
                styles={addCustomerDialog}
              />
              <Typography variant="caption" style={addCustomerDialog.phoneInputHelper}>
                {emergencyContactNumber && mobileError ? mobileHelper : ''}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} align="right" style={addCustomerDialog.buttonWrapper}>
            {isLoading ? (<Loader size={30} thickness={10} variant="determinate" />)
              : [
                <Button
                  key="cancel-button"
                  variant="contained"
                  style={addCustomerDialog.cancelButton}
                  color="secondary"
                  onClick={handleCustomerDialogClose}
                >
                  Cancel
                </Button>,
                <Button
                  id="add-button"
                  key="add-button"
                  variant="contained"
                  type="submit"
                  disabled={validateCustomerDialogInputs()}
                  color="primary"
                  style={addCustomerDialog.addButton}
                >
                  {!isSelected ? 'Add' : 'Done'}
                </Button>
              ]
            }
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};

RenderCustomerDialog.propTypes = {
  customers: PropTypes.instanceOf(Object),
  countries: PropTypes.instanceOf(Object),
  handleButton: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCountryInput: PropTypes.func.isRequired,
  handleCityInput: PropTypes.func.isRequired,
  handlePrimaryPhoneChange: PropTypes.func.isRequired,
  handleSecondaryPhoneChange: PropTypes.func.isRequired,
  handleContactPhoneChange: PropTypes.func.isRequired,
  handleCustomerDialogClose: PropTypes.func.isRequired,
  validateCustomerDialogInputs: PropTypes.func.isRequired
};

RenderCustomerDialog.defaultProps = {
  customers: {},
  countries: {},
};

export default withStyles(styles)(RenderCustomerDialog);
