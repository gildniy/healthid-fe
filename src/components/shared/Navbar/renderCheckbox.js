import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, FormControlLabel, Checkbox
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const RenderCheckBox = ({
  checked, name, classes, handleChange, label1, label2, disabled
}) => (
  <Grid item container xs={12} className={classes.checkboxContainer}>
    <FormControlLabel
      control={(
        <Checkbox
          checked={checked}
          disabled={disabled}
          className={classes.checkbox}
          icon={(
            <CheckBoxOutlineBlankIcon
              style={{ color: '#909090' }}
              fontSize="small"
            />
          )}
          checkedIcon={(
            <CheckBoxIcon
              fontSize="small"
            />
          )}
          onChange={handleChange}
          name={name}
          color="primary"
          size="small"
        />
      )}
      label={(
        <>
          <Typography variant="caption" className={classes.labelHeader}>
            {label1}
          </Typography>
          <Typography variant="caption" className={classes.labelOption}>
            {label2}
          </Typography>
        </>
      )}
    />
  </Grid>
);

RenderCheckBox.propTypes = {
  classes: PropTypes.instanceOf(Object),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label1: PropTypes.string,
  label2: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

RenderCheckBox.defaultProps = {
  classes: {},
  name: '',
  label1: '',
  label2: '',
  checked: false,
  disabled: false,
};

export default RenderCheckBox;
