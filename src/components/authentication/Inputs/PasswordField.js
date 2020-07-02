import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, IconButton, TextField, InputAdornment
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const PasswordField = ({
  showPassword, password, handlePasswordChange, classes,
  error, helperPasswordText, handlePasswordVisibility
}) => {
  const type = showPassword ? 'text' : 'password';
  const passwordIcon = showPassword ? <Visibility /> : <VisibilityOff />;

  return (
    <FormControl
      error={password ? error : false}
      style={{ paddingBottom: '25px' }}
      className="textfield"
    >
      <TextField
        id="adornment-password"
        name="password"
        required
        type={type}
        value={password}
        label="Password"
        onChange={handlePasswordChange}
        className={classes.root}
        InputProps={{
          style: {
            paddingLeft: '.5rem',
            color: '#C3C3C3',
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={handlePasswordVisibility}
                className="password-icon"
              >
                {passwordIcon}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {password && error ? helperPasswordText : null}
    </FormControl>
  );
};

PasswordField.propTypes = {
  showPassword: PropTypes.bool,
  password: PropTypes.string,
  helperPasswordText: PropTypes.string,
  handlePasswordChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  handlePasswordVisibility: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object)
};

PasswordField.defaultProps = {
  password: '',
  helperPasswordText: '',
  showPassword: false,
  error: false,
  classes: {}
};

export default PasswordField;
