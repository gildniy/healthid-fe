import React from 'react';
import PropTypes, { object } from 'prop-types';
import clsx from 'clsx';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { StepperStyles } from '../../assets/styles/setup';

const StepperIcon = ({
  active, completed, classes
}) => (
  <Grid
    className={clsx(classes.root, {
      [classes.active]: active,
      [classes.completed]: completed,
    })}
  >
    <Grid>
      {completed
        ? <CheckCircle className={classes.completed} />
        : <div className={classes.circle} />
      }
      {active
        ? <Typography variant="caption" className={classes.dots}>...</Typography>
        : ''
      }
    </Grid>
  </Grid>
);

StepperIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  classes: PropTypes.objectOf(object)
};

StepperIcon.defaultProps = {
  active: false,
  completed: false,
  classes: {}
};

export default withStyles(StepperStyles)(StepperIcon);
