import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField, CircularProgress, FormControl
} from '@material-ui/core';
import LoginAlert from './Alerts/LoginAlert';
import ForgotPasswordAlert from './Alerts/ForgotPasswordAlert';
import PasswordField from './Inputs/PasswordField';
import CustomPhoneField from '../shared/customPhoneField';
import loginStyles from '../../assets/styles/authentication/loginStyles';
import '../../assets/styles/authentication/auth.scss';

class Login extends Component {
  renderInputFields = (type) => {
    const {
      state: { EmailError, email, helperEmailText },
      handleEmailChange, classes
    } = this.props;
    const phoneLabelNum = type === 'phone' ? 'Phone #' : null;
    const emailLabel = type === 'email' ? 'Email' : null;
    return (
      <div>
        {type === 'email' ? (
          <FormControl className="login-email-field">
            <TextField
              label={emailLabel}
              name={type}
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
        ) : (
          this.renderPhoneInputs(phoneLabelNum)
        )}
      </div>
    );
  };

  renderPhoneInputs = () => {
    const {
      state: { phone },
      handlePhoneChange
    } = this.props;
    return (
      <div className="phone-input">
        <CustomPhoneField
          value={phone}
          onChange={handlePhoneChange}
          styles={loginStyles}
        />
      </div>
    );
  };

  render() {
    const {
      state: {
        email, password, loading, showPassword, passwordError, helperPasswordText,
        checked, inputType, openAlert, loginSuccess, loginErrors,
        EmailError, openForgotPasswordAlert, disabled, helperEmailText
      },
      handlePasswordChange,
      handlePasswordVisibility,
      handleSubmit,
      handleChangeInput,
      handleCloseLoginAlert,
      handleCheckbox,
      handleEmailChange,
      handleCloseForgotPasswordAlert,
      switchAccount,
      handleOpenForgotPasswordAlert,
      handlePasswordReset,
      classes
    } = this.props;

    const hidden = loading ? { display: 'none' } : { display: 'block' };

    const activeEmail = inputType === 'email' ? '--active' : '';
    const activePhone = inputType === 'phone' ? '--active' : '';
    const loginLabel = !switchAccount ? 'LOGIN' : 'SWITCH ACCOUNT';
    const emailClass = !switchAccount ? `email-label${activeEmail}` : `switch-email-label${activeEmail}`;
    const phoneClass = !switchAccount ? `phone-label${activePhone}` : `switch-phone-label${activePhone}`;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="top-level">
              <div className={!switchAccount ? 'login-label' : 'login-switch'}>
                {!switchAccount ? 'Login with:' : 'Switch with:'}
              </div>
              <div
                id="email-type"
                role="button"
                tabIndex="0"
                onClick={handleChangeInput}
                onKeyDown={handleChangeInput}
                className={emailClass}
              >
                Email
              </div>
              <div className={!switchAccount ? 'separator' : 'separator-switch'} />
              <div
                id="phone-type"
                role="button"
                tabIndex="-1"
                onClick={handleChangeInput}
                onKeyDown={handleChangeInput}
                className={phoneClass}
              >
                Phone Number
              </div>
            </div>
            <div>
              <div className="input-fields">{this.renderInputFields(inputType)}</div>
            </div>
          </div>
          <PasswordField
            classes={classes}
            showPassword={showPassword}
            password={password}
            error={passwordError}
            helperPasswordText={helperPasswordText}
            handlePasswordChange={handlePasswordChange}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          {!switchAccount && (
            <div className="form-checks">
              <div>
                <label className="check-container">
                  <small className="small-text">Remember me</small>
                  <input
                    type="checkbox"
                    checked={checked}
                    name="checked"
                    onChange={handleCheckbox}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className="password-link"
                  onClick={handleOpenForgotPasswordAlert}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )}
          {!switchAccount && (
            <ForgotPasswordAlert
              open={openForgotPasswordAlert}
              EmailError={EmailError}
              handlePasswordReset={handlePasswordReset}
              handleEmailChange={handleEmailChange}
              onClose={handleCloseForgotPasswordAlert}
              loading={loading}
              disabled={disabled}
              helperEmailText={helperEmailText}
            />
          )}
          {loading ? <CircularProgress color="primary" className="loader" /> : ''}
          {EmailError ? (
            <button
              className={!switchAccount ? 'disabled-register' : 'disabled-login'}
              type="button"
              disabled
            >
              {loginLabel}
            </button>
          ) : (
            <button
              className={!switchAccount ? 'register-btn' : 'login-btn'}
              type="submit"
              style={hidden}
            >
              {loginLabel}
            </button>
          )}
          <LoginAlert
            open={openAlert}
            onClose={handleCloseLoginAlert}
            success={loginSuccess}
            email={email}
            errors={loginErrors}
          />
          {!switchAccount && (
            <p className="login-qn">
              Don&apos;t have an account?&nbsp;
              {' '}
              <Link to="/register" className="login-link">REGISTER</Link>
            </p>
          )}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  switchAccount: PropTypes.bool.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleCloseLoginAlert: PropTypes.func,
  handleCheckbox: PropTypes.func.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handlePasswordReset: PropTypes.func,
  handleCloseForgotPasswordAlert: PropTypes.func,
  handleOpenForgotPasswordAlert: PropTypes.func,
  classes: PropTypes.instanceOf(Object)
};

Login.defaultProps = {
  handlePasswordReset: () => { },
  handleCloseLoginAlert: () => { },
  handleCloseForgotPasswordAlert: () => { },
  handleOpenForgotPasswordAlert: () => { },
  classes: {}
};

export default Login;
