import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Tooltip, IconButton
} from '@material-ui/core';

const CustomPageHeader = ({
  classes, previousPage, children, title, state, styles
}) => (
  <Fragment>
    <Grid
      container
      alignItems="center"
      style={styles.buttonsGrid}
      className={classes.arrowButtonGrid}
    >
      <Grid item xs={6} container alignItems="center">
        <Grid item className={classes.arrowSpace}>
          <Link to={{ pathname: previousPage, state }}>
            <Tooltip title={title}>
              <IconButton>
                <BackIcon className={classes.arrowIcon} />
              </IconButton>
            </Tooltip>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            Back
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} align="right">
        {children}
      </Grid>
    </Grid>
  </Fragment>
);
CustomPageHeader.propTypes = {
  previousPage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object),
  state: PropTypes.instanceOf(Object),
  styles: PropTypes.instanceOf(Object),
  children: PropTypes.node.isRequired,
};

CustomPageHeader.defaultProps = {
  state: {},
  classes: {},
  styles: {}
};

export default CustomPageHeader;
