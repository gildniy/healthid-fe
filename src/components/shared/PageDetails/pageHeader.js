import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Tooltip, IconButton
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { supplierDetailStyles } from '../../../assets/styles/suppliers/supplierDetail';

const PageHeader = (props) => {
  const {
    classes, previousPage, children, title, state
  } = props;
  return (
    <Fragment>
      <Grid container direction="row" alignItems="center" className={classes.arrowButtonGrid}>
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
          <Typography variant="h5" className={classes.arrowButtonLabel}>
            {' Back ' }
          </Typography>
        </Grid>
        <Grid className={classes.buttonGrid}>{children}</Grid>
      </Grid>
    </Fragment>
  );
};
PageHeader.propTypes = {
  previousPage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object),
  state: PropTypes.instanceOf(Object),
  children: PropTypes.node,
};

PageHeader.defaultProps = {
  state: {},
  children: {},
  classes: {}


};

export default withStyles(supplierDetailStyles)(PageHeader);
