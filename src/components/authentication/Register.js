import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField, CircularProgress, FormControl
} from '@material-ui/core';
import RegisterAlert from './Alerts/RegisterAlert';
import PasswordField from './Inputs/PasswordField';
import CustomPhoneField from '../shared/customPhoneField';
import loginStyles from '../../assets/styles/authentication/loginStyles';
import '../../assets/styles/authentication/auth.scss';

const Register = (props) => {
  const {
    state: {
      password, email, loading, showPassword, helperPasswordText,
      helperEmailText, passwordError, EmailError, PhoneError, openAlert,
      checked, registerSuccess, registerErrors, phone
    },
    handlePasswordChange, handlePasswordVisibility,
    handleEmailChange, handleCloseSignupAlert, handleCheckbox,
    handlePhoneChange, handleSignup, classes
  } = props;

  const hidden = loading ? { display: 'none' } : { display: 'block' };

  const formError = passwordError || EmailError || PhoneError;

  const emptyField = (!email || !phone || !password);

  const buttonCondition = emptyField || formError;

  return (
    <div>
      <FormControl className="login-email-field">
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          error={email ? EmailError : false}
          value={email}
          onChange={handleEmailChange}
          className={classes.root}
          inputProps={{
            style: {
              paddingLeft: '.5rem',
              color: '#C3C3C3',
            }
          }}
        />
        {email && EmailError ? helperEmailText : ''}
      </FormControl>
      <div className="phone-input">
        <CustomPhoneField
          value={phone}
          onChange={handlePhoneChange}
          styles={loginStyles}
        />
      </div>
      <div>
        <PasswordField
          classes={classes}
          showPassword={showPassword}
          error={passwordError}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handlePasswordVisibility={handlePasswordVisibility}
          helperPasswordText={helperPasswordText}
        />
        <div>
          <label className="check-container">
            <small className="small-text">
              By signing up, you agree to our&nbsp;
              {' '}
              <a href="/terms-of-service" className="small-anchor">Terms of Service</a>
              {' '}
              &nbsp;and&nbsp;
              {' '}
              <a href="/privacy-policy" className="small-anchor">Privacy Policy</a>
              .
            </small>
            <input type="checkbox" checked={checked} name="checked" onChange={handleCheckbox} />
            <span className="checkmark" />
          </label>
        </div>
      </div>
      <div className="bottom-section">
        {loading ? <CircularProgress className="loader" color="primary" /> : ''}
        {!buttonCondition && checked
          ? <button className="register-btn" type="button" style={hidden} onClick={handleSignup}>REGISTER</button>
          : <button className="disabled-register" type="button" disabled value="REGISTER">REGISTER</button>
        }
        <RegisterAlert
          open={openAlert}
          onClose={handleCloseSignupAlert}
          success={registerSuccess}
          email={email}
          registerErrors={registerErrors}
        />
      </div>
      <p className="login-qn">
        {'Already have an account? '}
        <Link to="/" className="login-link">LOGIN</Link>
      </p>
    </div>
  );
};
Register.defaultProps = {
  handlePasswordChange: () => {},
  handlePasswordVisibility: () => {},
  handleEmailChange: () => {},
  handleCloseSignupAlert: () => {},
  handleCheckbox: () => {},
  handlePhoneChange: () => {},
  handleSignup: () => { },
  classes: {}
};

Register.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  handlePasswordChange: PropTypes.func,
  handlePasswordVisibility: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handleCloseSignupAlert: PropTypes.func,
  handleCheckbox: PropTypes.func,
  handlePhoneChange: PropTypes.func,
  handleSignup: PropTypes.func,
  classes: PropTypes.instanceOf(Object)
};

export default Register;
