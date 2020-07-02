import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Tooltip, IconButton
} from '@material-ui/core';

const ProposeEditHeader = (props) => {
  const {
    classes, previousPage, children, type
  } = props;
  return (
    <Fragment>
      <Grid container direction="row" alignItems="center" className={classes.arrowButtonGrid}>
        <Link to={previousPage}>
          <Tooltip title={`Back To ${type}`}>
            <IconButton>
              <BackIcon className={classes.arrowIcon} />
            </IconButton>
          </Tooltip>
        </Link>
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

ProposeEditHeader.propTypes = {
  previousPage: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProposeEditHeader;
