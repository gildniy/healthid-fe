import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import {
  Paper, Grid, Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { dashboardStyles } from '../../assets/styles/dashboard/dash';
import DateSelectorButtons from './dateSelectorButtons';
import DateRangeSelector from './dateRangeSelector';
import UpArrow from '../../assets/images/dashboard/UpArrow.png';
import DashboardActionTypes from '../../providers/reducers/dashboard/dashboardTypes';
import currencyFormatter from '../payment/utils/formatter';

import { useStateValue } from '../../providers/stateProvider';

export const StoreSalesPerformance = ({
  data,
  currency,
  classes,
  active,
  range,
  handleDateButtons,
  handleIconDateRange
}) => {
  const [saleTotal, setSaleTotal] = useState(0);
  const [{
    dashboard: {
      saleChartData: { series, options }
    }
  }, dispatch] = Object.values(useStateValue());

  const setGraphData = () => {
    const { salePerformances } = data || [];
    const { edges } = salePerformances || [];
    const addedTotal = (edges && edges.length && edges.map(({ node }) => node.subtotal)
      .reduce((sum, i) => sum + i, 0)) || 0;
    setSaleTotal(addedTotal);
    dispatch({
      type: DashboardActionTypes.SET_INITIAL_DATA,
      payload: edges
    });
  };

  React.useEffect(() => {
    data && setGraphData();
    localStorage.setItem('currency', currency);
    // Cleanup interval
    return () => localStorage.removeItem('currency');
  }, []);

  return (
    <Paper square elevation={2} className={classes.paper}>
      <Grid container justify="space-between" className={classes.paperInnerGrid1}>
        <Typography variant="h5" className={classes.mainHeader}>
          Store Sales Performance
        </Typography>
        <Grid item container xs={6}>
          <Grid item xs={5}>
            <DateSelectorButtons
              active={active}
              classes={classes}
              handleDateButtons={handleDateButtons}
            />
          </Grid>
          <Grid item container xs={7} justify="flex-end">
            <DateRangeSelector
              classes={classes}
              range={range}
              handleIconDateRange={handleIconDateRange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.paperInnerGrid2}>
        <Grid item container xs={2} className={classes.statisticsGrid}>
          <Typography variant="caption" className={classes.statisticsHeading}>
            Sale Amount
          </Typography>
          <Grid item className={classes.individualStatdetails}>
            <span className={classes.individualStatDataValue}>
              {`${currency} ${currencyFormatter(saleTotal)}`}
            </span>
            <img src={UpArrow} alt="up arrow" className={classes.arrowStyle} />
            <span className={classes.successText}>4 %</span>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Paper square elevation={0} className={classes.chartPaper}>
            <Chart
              series={series}
              options={options}
              type="area"
              height="220"
              width="842"
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
StoreSalesPerformance.propTypes = {
  data: PropTypes.instanceOf(Object),
  currency: PropTypes.string,
  classes: PropTypes.instanceOf(Object),
  active: PropTypes.string,
  range: PropTypes.string,
  handleDateButtons: PropTypes.func.isRequired,
  handleIconDateRange: PropTypes.func.isRequired,
};

StoreSalesPerformance.defaultProps = {
  data: {},
  currency: '',
  classes: {},
  active: '',
  range: '',
};

export default withStyles(dashboardStyles)(StoreSalesPerformance);
