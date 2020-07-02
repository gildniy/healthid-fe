import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

const DateRangeSelector = ({
  classes,
  range,
  handleIconDateRange
}) => (
  <>
    <ArrowLeft
      className={classes.iconDateRange}
      onClick={() => handleIconDateRange('backward')}
    />
    <Paper elevation={2} className={classes.paperDateRange}>
      <Typography variant="caption" className={classes.typoDateRange}>
        {range}
      </Typography>
    </Paper>
    <ArrowRight
      className={classes.iconDateRange}
      onClick={() => handleIconDateRange('forward')}
    />
  </>
);
DateRangeSelector.propTypes = {
  classes: PropTypes.instanceOf(Object),
  handleIconDateRange: PropTypes.func.isRequired,
  range: PropTypes.string,
};

DateRangeSelector.defaultProps = {
  classes: {},
  range: ''
};

export default DateRangeSelector;
