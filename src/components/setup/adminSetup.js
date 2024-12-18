import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomPhoneField from '../shared/customPhoneField';

const AdminSetUp = ({
  state,
  handleInputChange,
  handlePhoneChange,
  checked,
  errorHandler,
  serverErrorHandler
}) => {
  const {
    firstName,
    lastName,
    email,
    username,
    secondaryEmail,
    secondaryPhoneNumber,
    mobileNumber,
    formError,
    isError,
    phone,
    checked: isChecked
  } = state;

  return (
    <React.Fragment>
      <form>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10}>
            <TextField
              required
              id="firstname"
              name="firstName"
              label="First Name"
              fullWidth
              value={firstName}
              autoComplete="first name"
              error={firstName ? false : formError}
              helperText={firstName ? '' : errorHandler()}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              id="lastname"
              name="lastName"
              label="Last Name"
              fullWidth
              value={lastName}
              autoComplete="last name"
              error={lastName ? false : formError}
              helperText={lastName ? '' : errorHandler()}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              id="username"
              name="username"
              label="User Name"
              fullWidth
              value={username}
              autoComplete="user name"
              error={username ? false : formError}
              helperText={username ? '' : errorHandler()}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              id="outlined-with-placeholder"
              label="Email"
              type="email"
              name="email"
              value={email}
              autoComplete="email"
              fullWidth
              error={email ? false : isError}
              helperText={email ? '' : serverErrorHandler()}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              id="outlined-with-placeholder"
              label="Secondary Email"
              type="email"
              name="secondaryEmail"
              value={secondaryEmail}
              autoComplete="email"
              fullWidth
              error={secondaryEmail ? false : formError}
              helperText={secondaryEmail ? '' : errorHandler()}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              id="outlined-with-placeholder"
              label="Phone #"
              name="mobileNumber"
              value={mobileNumber}
              fullWidth
              error={mobileNumber ? false : isError}
              helperText={mobileNumber ? '' : serverErrorHandler()}
              onChange={handleInputChange}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={10} container className="grid-container">
            <CustomPhoneField
              id="outlined-with-placeholder"
              label="Secondary Phone #"
              name="secondaryPhoneNumber"
              error={secondaryPhoneNumber ? false : formError}
              helperText={secondaryPhoneNumber ? '' : errorHandler()}
              value={phone}
              onChange={handlePhoneChange}
            />
          </Grid>

          <Grid item xs={10}>
            <FormControlLabel
              control={<Checkbox checked={isChecked} type="checkbox" color="secondary" name="permission" value="yes" onChange={checked} id="save-1" />}
              label="I acknowledge that am the owner and/or I have been assigned full admin rights to the business"
            />
          </Grid>

        </Grid>
      </form>
    </React.Fragment>
  );
};

AdminSetUp.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
  serverErrorHandler: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
};

export default AdminSetUp;
