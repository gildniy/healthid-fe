import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Typography, Button } from '@material-ui/core';

const DateSelectorButtons = ({
  active,
  classes,
  handleDateButtons
}) => (
  <>
    <Button
      size="medium"
      variant={active === 'date' ? 'contained' : 'outlined'}
      color={active === 'date' ? 'primary' : ''}
      onClick={() => handleDateButtons('date')}
      className={clsx(classes.dateButtons, classes.btnLeft)}
    >
      <Typography variant="caption">Day</Typography>
    </Button>
    <Button
      size="medium"
      variant={active === 'week' ? 'contained' : 'outlined'}
      color={active === 'week' ? 'primary' : ''}
      onClick={() => handleDateButtons('week')}
      className={clsx(classes.dateButtons, classes.btnCenter)}
    >
      <Typography variant="caption">Week</Typography>
    </Button>
    <Button
      size="medium"
      variant={active === 'month' ? 'contained' : 'outlined'}
      color={active === 'month' ? 'primary' : ''}
      onClick={() => handleDateButtons('month')}
      className={clsx(classes.dateButtons, classes.btnRight)}
    >
      <Typography variant="caption">Month</Typography>
    </Button>
  </>
);
DateSelectorButtons.propTypes = {
  active: PropTypes.string,
  classes: PropTypes.instanceOf(Object),
  handleDateButtons: PropTypes.func.isRequired
};

DateSelectorButtons.defaultProps = {
  active: '',
  classes: {}
};

export default DateSelectorButtons;
