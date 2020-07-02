import React from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-labelled';
import 'react-phone-input-labelled/dist/style.css';
import CustomPhoneFieldStyles from '../../assets/styles/shared/customPhoneFieldStyles';

const CustomPhoneField = ({
  value, onChange, label, styles
}) => {
  const containerStyles = styles.containerStyles || CustomPhoneFieldStyles.containerStyles;
  const inputStyles = styles.inputStyles || CustomPhoneFieldStyles.inputStyles;
  const labelStyle = styles.labelStyle || CustomPhoneFieldStyles.labelStyle;
  const buttonStyles = styles.buttonStyles || CustomPhoneFieldStyles.buttonStyles;
  const dropdownStyles = styles.dropdownStyles || CustomPhoneFieldStyles.dropdownStyles;
  const preferredCountries = ['ng', 'ug', 'gb', 'rw'];
  return (
    <PhoneInput
      value={value}
      placeholder=""
      preferredCountries={preferredCountries}
      label={label}
      defaultCountry="ng"
      onChange={onChange}
      containerStyle={containerStyles}
      inputStyle={inputStyles}
      labelStyle={labelStyle}
      buttonStyle={buttonStyles}
      dropdownStyle={dropdownStyles}
      inputExtraProps={{
        margin: 'normal',
        required: true,
        name: 'phone'
      }}
    />
  );
};
CustomPhoneField.propTypes = {
  styles: PropTypes.objectOf(Object),
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};
CustomPhoneField.defaultProps = {
  styles: {},
  onChange: () => {},
  value: '',
  label: 'Phone #',
};
export default CustomPhoneField;
