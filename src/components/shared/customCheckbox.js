import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import checkboxStyles from '../../assets/styles/shared/customCheckboxStyles';

export const CustomCheckbox = (props) => {
  const {
    classes, label, checked, handleChange
  } = props;
  return (
    <FormControlLabel
      style={{ margin: 0 }}
      control={(
        <Checkbox
          checked={checked}
          onChange={handleChange}
          className={classes.root}
          disableRipple
          color="default"
          checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
          icon={<span className={classes.icon} />}
          inputProps={{ 'aria-label': 'decorative checkbox' }}
          {...props}
        />
      )}
      label={label}
    />
  );
};

CustomCheckbox.propTypes = {
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  classes: PropTypes.instanceOf(Object),
  label: PropTypes.instanceOf(Array),
};

CustomCheckbox.defaultProps = {
  checked: false,
  handleChange: () => { },
  classes: {},
  label: []
};

export default withStyles(checkboxStyles)(CustomCheckbox);
