import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Paper, Popper, Grow,
} from '@material-ui/core';
import popperStyles from '../../assets/styles/shared/networkStatusStyles';

const NetworkStatus = ({ offline, classes }) => {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    setIsOffline(offline);
  }, [offline]);
  return isOffline
    ? (
      <Popper
        open={offline}
        transition
        disablePortal
        style={popperStyles.root}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper elevation={2} square className={classes.paper}>
              <Grid container item xs={12} className={classes.gridContainer}>
                <Typography variant="body2">PharmIQ is offline with limited functionality.</Typography>
                <Typography variant="body2">Continue selling as usual.</Typography>
              </Grid>
            </Paper>
          </Grow>
        )}
      </Popper>
    )
    : '';
};

NetworkStatus.propTypes = {
  offline: PropTypes.bool,
  classes: PropTypes.instanceOf(Object)
};

NetworkStatus.defaultProps = {
  offline: false,
  classes: {}
};

export default withStyles(popperStyles)(NetworkStatus);
