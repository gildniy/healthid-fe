import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography } from '@material-ui/core';
import Chart from 'react-apexcharts';
import DownArrow from '../../assets/images/dashboard/DownArrow.png';
import UpArrow from '../../assets/images/dashboard/UpArrow.png';
import { weeklyData } from './mocks/variables';
import DashboardActionTypes from '../../providers/reducers/dashboard/dashboardTypes';

import { useStateValue } from '../../providers/stateProvider';

export const ProductsAndCustomers = ({
  data,
  classes
}) => {
  const [productVolume, setProductVolume] = useState(0);
  const [{
    dashboard: {
      productChartData: { series, options }
    }
  }, dispatch] = Object.values(useStateValue());

  const setGraphData = () => {
    const { salePerformances } = data || [];
    const { edges } = salePerformances || [];
    const totalVolume = (edges && edges.length && edges.map(({ node }) => node.quantitySold)
      .reduce((sum, i) => sum + i, 0)) || 0;
    setProductVolume(totalVolume);
    dispatch({
      type: DashboardActionTypes.SET_INITIAL_DATA,
      payload: edges
    });
  };

  React.useEffect(() => {
    data && setGraphData();
  }, []);

  return (
    <Grid container spacing={2} style={{ marginTop: '.8rem' }}>
      {weeklyData.prodSalesCustomers.map(({
        title, currentValue, previousValue,
      }) => {
        const noSaleComparison = previousValue === 0;
        const increase = currentValue >= previousValue;
        const percentage = noSaleComparison
          ? 0
          : Math.abs(((currentValue - previousValue) / previousValue * 100));
        return (
          <Grid item container xs={3} key={title}>
            <Paper elevation={2} square className={classes.individualStat}>
              <Grid container className={classes.relativeContainer}>
                <Grid item container className={classes.individualStatBody}>
                  <Typography variant="caption" className={classes.individualStatheading}>
                    {title}
                  </Typography>
                  <Grid item className={classes.individualStatdetails}>
                    <span className={classes.individualStatDataValue}>
                      {productVolume}
                    </span>
                    {increase
                      ? <img src={UpArrow} alt="up arrow" className={classes.arrowStyle} />
                      : <img src={DownArrow} alt="down arrow" className={classes.arrowStyle} />
                    }
                    <span className={increase ? classes.successText : classes.dangerText}>
                      {`${percentage}%`}
                    </span>
                  </Grid>
                </Grid>
                <Grid item className={classes.individualStatGraph}>
                  <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height="128"
                    width={weeklyData.period === 'weekly' ? '200' : '260'}
                    style={weeklyData.period === 'weekly' ? {} : { position: 'relative', right: '60px' }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

ProductsAndCustomers.propTypes = {
  data: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
};

ProductsAndCustomers.defaultProps = {
  data: {},
  classes: {},
};

export default ProductsAndCustomers;
