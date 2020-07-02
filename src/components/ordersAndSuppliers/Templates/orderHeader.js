import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Tooltip, IconButton
} from '@material-ui/core';

const OrderHeader = ({
  classes, previousPage, children
}) => (
  <Fragment>
    <Grid container direction="row" alignItems="center" className={classes.arrowButtonGrid}>
      <Grid item>
        <Link to={previousPage}>
          <Tooltip title="Back to orders">
            <IconButton>
              <BackIcon className={classes.arrowIcon} />
            </IconButton>
          </Tooltip>
        </Link>
      </Grid>
      <Grid item>
        <Typography variant="h5" className={classes.arrowButtonLabel}>
          Back
        </Typography>
      </Grid>
      <Grid className={classes.buttonGrid}>
        {children}
      </Grid>
    </Grid>
  </Fragment>
);
OrderHeader.propTypes = {
  previousPage: PropTypes.string,
  classes: PropTypes.instanceOf(Object),
  children: PropTypes.node,
};

OrderHeader.defaultProps = {
  previousPage: '',
  classes: {},
  children: [],
};

export default OrderHeader;
