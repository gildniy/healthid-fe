import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper, Typography, Grid, Tooltip, IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBack';
import { salesHistoryStyles } from '../../../assets/styles/salesHistory/salesHistoryStyles';
import DataTable from './dataTable';
import SaleHistoryTotals from './saleHistoryTotals';

export const SalesHistoryDetails = ({
  title,
  classes,
  createColumns,
  handleResetSales,
  handleOnRowClick,
}) => {
  const columns = ['date sold', 'location', 'sold by', 'receipt id', 'sold to'];
  return (
    <Fragment>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.mainGrid}
      >
        <Grid item>
          <Link to="/sell">
            <Tooltip title="Back to products">
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
      </Grid>
      <SaleHistoryTotals
        classes={classes}
      />
      <Paper elevation={2} square className={classes.paper}>
        <DataTable
          title={title}
          columns={createColumns(columns)}
          handleResetSales={handleResetSales}
          handleOnRowClick={handleOnRowClick}
        />
      </Paper>
    </Fragment>
  );
};

SalesHistoryDetails.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.instanceOf(Object),
  createColumns: PropTypes.func.isRequired,
  handleResetSales: PropTypes.func.isRequired,
  handleOnRowClick: PropTypes.func.isRequired,
};

SalesHistoryDetails.defaultProps = {
  title: '',
  classes: {},
};

export default withStyles(salesHistoryStyles)(SalesHistoryDetails);
