import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import moment from 'moment';
import withAuth from '../withAuth';
import { dashboardStyles } from '../../assets/styles/dashboard/dash';
import StoreSalesPerformance from './storeSalesPerformance';
import ProductsAndCustomers from './productsAndCustomers';
import TopSellingProduct from './topSellingProduct';
import FinancialStatChart from './charts/financialStatChart';
import { GET_SALES_PERFORMANCES } from '../../queries/dashboard/salesPerformancesQuery';
import { SalesPerformanceLoader } from './utils';

import { useStateValue } from '../../providers/stateProvider';
import OutletOperations from './outletOperations';

export const Dashboard = ({ classes, session }) => {
  const [active, setActive] = useState('date');
  const [startDate, setStartDate] = useState(moment().startOf('date'));
  const [endDate, setEndDate] = useState(moment().endOf('date'));
  const [range, setRange] = useState(moment().format('ll'));

  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid1'
    });
  }, []);

  const handleDateButtons = (event) => {
    setActive(event);
    const start = moment().startOf(event);
    const end = moment().endOf(event);
    setStartDate(start);
    setEndDate(end);
    if (event === 'date') return setRange(moment().format('ll'));
    setRange(`${start.format('ll')} - ${end.format('ll')}`);
  };

  const handleIconDateRange = (direction) => {
    let start;
    let end;
    if (direction === 'backward') {
      if (active === 'date') {
        start = startDate.clone().subtract(1, 'd');
        end = endDate.clone().subtract(1, 'd');
      } else if (active === 'week') {
        start = startDate.clone().subtract(7, 'd');
        end = endDate.clone().subtract(7, 'd');
      } else {
        start = startDate.clone().subtract(30, 'd');
        end = endDate.clone().subtract(30, 'd');
      }
    } else if (active === 'date') {
      start = startDate.clone().add(1, 'd');
      end = endDate.clone().add(1, 'd');
    } else if (active === 'week') {
      start = startDate.clone().add(7, 'd');
      end = endDate.clone().add(7, 'd');
    } else {
      start = startDate.clone().add(30, 'd');
      end = endDate.clone().add(30, 'd');
    }
    setStartDate(start);
    setEndDate(end);
    if (active === 'date') return setRange(start.format('ll'));
    setRange(`${start.format('ll')} - ${end.format('ll')}`);
  };

  const { activeOutlet } = session.me;
  const { id, outletpreference: { outletCurrency } } = activeOutlet;
  const currency = outletCurrency.symbol;
  return (
    <Query
      query={GET_SALES_PERFORMANCES}
      fetchPolicy="network-only"
      variables={{
        outlets: [Number(id)],
        dateFrom: startDate,
        dateTo: endDate,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <SalesPerformanceLoader classes={classes} />;
        if (error && !error.message.includes('No Data available')) return `Error! ${error.message}`;
        return (
          <Grid container className={classes.containerGrid}>
            <Grid item container className={classes.paperGrid1}>
              <StoreSalesPerformance
                data={data}
                currency={currency}
                active={active}
                range={range}
                handleDateButtons={handleDateButtons}
                handleIconDateRange={handleIconDateRange}
              />
            </Grid>
            <Grid item container className={classes.paperGrid2}>
              <TopSellingProduct
                classes={classes}
              />
            </Grid>
            <ProductsAndCustomers
              data={data}
              classes={classes}
            />
            <Grid container spacing={3} style={{ marginTop: '.8rem' }}>
              <Grid item xs={12}>
                <Paper elevation={2} square className={classes.financialStat}>
                  <span className={classes.statSectionHeading}>
                    Financial sale performance
                  </span>
                  <div className={classes.financialStatGraph}>
                    <FinancialStatChart />
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <OutletOperations
              data={data}
              classes={classes}
            />
          </Grid>
        );
      }}
    </Query>
  );
};
Dashboard.propTypes = {
  classes: PropTypes.instanceOf(Object),
  session: PropTypes.instanceOf(Object)
};

Dashboard.defaultProps = {
  classes: {},
  session: {}
};

export default withAuth(withStyles(dashboardStyles)(Dashboard));
