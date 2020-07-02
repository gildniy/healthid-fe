import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { selectFieldStyles } from '../../assets/styles/setup';

// NOOPTIONSMESSAGE COMPONENT
export const NoOptionsMessage = ({ selectProps, innerProps, children }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    {children}
  </Typography>
);

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.objectOf(PropTypes.object),
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};
NoOptionsMessage.defaultProps = {
  children: '<span />',
  innerProps: {}
};

// INPUT COMPONENT
export const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;
inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export const DropdownIndicator = selectProps => (
  <ArrowDropDownIcon
    {...selectProps}
    style={{ color: '#7D7D7D' }}
  />
);

DropdownIndicator.propTypes = {
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

// CONTROL COMPONENT
export const Control = ({
  children,
  innerProps,
  innerRef,
  selectProps,
}) => {
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    setFocused(false);
  }, []);
  const {
    classes,
    TextFieldProps,
    specificStyles,
    disableUnderline,
    label,
    value
  } = selectProps;
  return (
    <TextField
      fullWidth
      onFocus={() => setFocused(!focused)}
      onBlur={() => setFocused(!focused)}
      margin="normal"
      className={classes.textField}
      label={label}
      InputLabelProps={{
        shrink: !!value.label || focused
      }}
      InputProps={{
        inputComponent,
        disableUnderline,
        inputProps: {
          className: `${classes.input} ${specificStyles}`,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
};

Control.propTypes = {
  children: PropTypes.node.isRequired,
  innerProps: PropTypes.objectOf(PropTypes.any).isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

// OPTION COMPONENT
export const Option = ({
  isFocused, innerProps, children
}) => (
  <MenuItem
    selected={isFocused}
    component="div"
    style={{
      overflowX: 'scroll',
      padding: '.3rem .8rem'
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
);

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.objectOf(PropTypes.any),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};

Option.defaultProps = {
  children: <span />,
  innerProps: {},
  innerRef: {},
  isFocused: false,
  isSelected: false,
};

// PLACEHOLDER COMPONENT
export const Placeholder = ({ selectProps, innerProps }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.placeholder}
    {...innerProps}
  >
    {selectProps.placeholder}
  </Typography>
);

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.objectOf(PropTypes.object),
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

Placeholder.defaultProps = {
  children: <span />,
  innerProps: {},
};

// MENU COMPONENT
export const Menu = ({ selectProps, innerProps, children }) => (
  <Paper elevation={2} square className={selectProps.classes.paper} {...innerProps}>
    {children}
  </Paper>
);

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.objectOf(PropTypes.any),
  selectProps: PropTypes.objectOf(PropTypes.any),
};

Menu.defaultProps = {
  children: <span />,
  innerProps: {},
  selectProps: {},
};

const customStyles = {
  valueContainer: provided => ({
    ...provided,
    paddingLeft: 0,
  }),
  singleValue: provided => ({
    ...provided,
    marginLeft: 0,
  }),
};

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  DropdownIndicator,
  IndicatorSeparator: () => null,
};

export const CustomSelectField = ({
  onOptionChange, classes, options, value, specificStyles, defaultValue, isLoading,
  disableUnderline, placeholder, label, menuHeight
}) => (
  <Select
    classes={classes}
    styles={customStyles}
    specificStyles={specificStyles}
    options={options}
    value={value}
    defaultValue={defaultValue}
    components={components}
    onChange={onOptionChange}
    isLoading={isLoading}
    disableUnderline={disableUnderline}
    placeholder={placeholder}
    label={label}
    className="single-select"
    classNamePrefix="react-select"
    menuPlacement="auto"
    maxMenuHeight={menuHeight || '12.5rem'}
  />
);

CustomSelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onOptionChange: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string),
  specificStyles: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  defaultValue: PropTypes.objectOf(PropTypes.string),
  isLoading: PropTypes.bool,
  disableUnderline: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  menuHeight: PropTypes.string,
};

CustomSelectField.defaultProps = {
  options: [{}],
  onOptionChange: () => null,
  classes: '',
  value: undefined,
  specificStyles: '',
  defaultValue: undefined,
  isLoading: false,
  disableUnderline: true,
  placeholder: '',
  label: undefined,
  menuHeight: ''
};

export default withStyles(selectFieldStyles)(CustomSelectField);
