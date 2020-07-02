import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  ContentWrapper,
  countriesStyles,
  RadioGroupStyles,
} from '../../assets/styles/setup';
import OutletList from './outletList';
import Loader from '../shared/Loader';

export const OutletSetUp = ({
  state,
  handleInPutChange,
  errorHandler,
  handleAddOutletButton,
  handleAddNewOutletButton,
  toggleRegisterDisplay,
  handleOutletEdit,
  handleOutletDelete,
  handleCheckboxChange,
  classes,
}) => {
  const {
    localGovernmentArea,
    city,
    checked,
    country,
    countries,
    outletType,
    outletName,
    outletTaxNumber,
    addressLine1,
    addressLine2,
    phoneNumber,
    dateLaunched,
    registerName,
    numberOfRegisters,
    formError,
    outletsActive,
    outletIsLoading,
    edittingOutlet,
  } = state;
  return (
    <Fragment>
      {outletsActive ? (
        <OutletList
          state={state}
          handleAddNewOutletButton={handleAddNewOutletButton}
          toggleRegisterDisplay={toggleRegisterDisplay}
          handleOutletEdit={handleOutletEdit}
          handleOutletDelete={handleOutletDelete}
          handleCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <form>
          <Grid container spacing={3} justify="center">
            <Grid item container spacing={3} style={ContentWrapper.wrapper}>
              <Grid item xs={6}>
                <TextField
                  id="outletname"
                  required
                  name="outletName"
                  label="Outlet Name"
                  fullWidth
                  value={outletName}
                  autoComplete="first name"
                  error={outletName ? false : formError}
                  helperText={outletName ? '' : errorHandler()}
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="taxNumber"
                  name="outletTaxNumber"
                  label="Outlet tax #"
                  fullWidth
                  value={outletTaxNumber}
                  autoComplete="outlet tax number"
                  error={outletTaxNumber ? false : formError}
                  helperText={outletTaxNumber ? '' : errorHandler()}
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="addressline1"
                  required
                  name="addressLine1"
                  label="Address Line 1"
                  fullWidth
                  value={addressLine1}
                  autoComplete="last name"
                  error={addressLine1 ? false : formError}
                  helperText={addressLine1 ? '' : errorHandler()}
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="addressline2"
                  name="addressLine2"
                  label="Address Line 2"
                  fullWidth
                  value={addressLine2}
                  autoComplete="Address Line 2"
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="country"
                  margin="normal"
                  style={ContentWrapper.pickers}
                  label="Country"
                  name="country"
                  select
                  value={country}
                  onChange={handleInPutChange}
                  SelectProps={{
                    MenuProps: {
                      PopoverClasses: {
                        paper: classes.popperPaper,
                      }
                    }
                  }}
                >
                  {countries && countries.map(option => (
                    <MenuItem
                      key={option.name}
                      value={option.name}
                      dense
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="normal"
                  style={ContentWrapper.pickers}
                  label="City/Town"
                  name="city"
                  value={city}
                  placeholder="Enter City..."
                  onChange={handleInPutChange}
                  InputLabelProps={{
                    shrink: true
                  }}
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
                <TextField
                  id="phoneno"
                  required
                  name="phoneNumber"
                  label="Phone #"
                  fullWidth
                  autoComplete="Phone #"
                  value={phoneNumber}
                  error={phoneNumber ? false : formError}
                  helperText={phoneNumber ? '' : errorHandler()}
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="datelaunched"
                  required
                  name="dateLaunched"
                  label="Date Launched"
                  type="date"
                  style={ContentWrapper.pickers}
                  defaultValue={dateLaunched}
                  error={dateLaunched ? false : formError}
                  helperText={dateLaunched ? '' : errorHandler()}
                  onChange={handleInPutChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} style={ContentWrapper.headers}>
              <Typography variant="h6">Outlet Type</Typography>
            </Grid>
            <Grid item xs={12} style={ContentWrapper.wrapper}>
              <RadioGroup
                name="outletType"
                aria-label="outlet"
                value={outletType}
                style={RadioGroupStyles.radioGroup}
                onChange={handleInPutChange}
                row
              >
                <FormControlLabel
                  value="storefront"
                  control={<Radio />}
                  label="Storefront"
                />
                <FormControlLabel
                  value="warehouse"
                  control={<Radio />}
                  label="Warehouse"
                />
                <div />
              </RadioGroup>
            </Grid>
            {outletType === 'storefront' && (
              <Fragment>
                <Grid item xs={12} style={ContentWrapper.headers}>
                  <Typography variant="h6">Set up Register</Typography>
                </Grid>
                <Grid item container spacing={3} style={ContentWrapper.wrapper}>
                  <Grid item xs={6}>
                    <TextField
                      id="registername"
                      required
                      name="registerName"
                      label="Register Name"
                      fullWidth
                      value={registerName}
                      autoComplete="register name"
                      error={registerName ? false : formError}
                      helperText={registerName ? '' : errorHandler()}
                      onChange={handleInPutChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      id="numberofregister"
                      required
                      name="numberOfRegisters"
                      label="Number Of Registers"
                      fullWidth
                      value={numberOfRegisters}
                      autoComplete="numnber of registers"
                      error={numberOfRegisters !== 0 ? false : formError}
                      helperText={numberOfRegisters !== 0 ? '' : errorHandler()}
                      onChange={handleInPutChange}
                    />
                  </Grid>
                </Grid>
              </Fragment>
            )}
            <Grid item container style={ContentWrapper.buttonStyle}>
              <Grid item xs={3} />
              <Grid item xs={3}>
                {outletIsLoading
                  ? (
                    <Grid item style={ContentWrapper.loader}>
                      <Loader />
                    </Grid>
                  ) : (
                    <Button
                      onClick={handleAddOutletButton}
                      style={ContentWrapper.button}
                      color="primary"
                      variant="contained"
                      id="outlet-button"
                      disabled={!checked}
                    >
                      {edittingOutlet ? 'done' : 'add outlet'}
                    </Button>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Fragment>
  );
};

OutletSetUp.propTypes = {
  handleInPutChange: PropTypes.func,
  errorHandler: PropTypes.func,
  handleAddOutletButton: PropTypes.func.isRequired,
  handleAddNewOutletButton: PropTypes.func.isRequired,
  toggleRegisterDisplay: PropTypes.func.isRequired,
  handleOutletEdit: PropTypes.func.isRequired,
  handleOutletDelete: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
};

OutletSetUp.defaultProps = {
  handleInPutChange: () => { },
  errorHandler: () => { },
  classes: {},
  state: {},
};

export default withStyles(countriesStyles)(OutletSetUp);
