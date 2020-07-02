import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography } from '@material-ui/core';
import BarChart from './charts/barChart';
import DownArrow from '../../assets/images/dashboard/DownArrow.png';
import UpArrow from '../../assets/images/dashboard/UpArrow.png';
import { weeklyData } from './mocks/variables';

const OutletOperations = ({
  classes
}) => (
  <Grid container spacing={3} style={{ marginTop: '.8rem' }}>
    {weeklyData.outletCashFlow.map(({
      title, currentValue, previousValue, tally
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
                  <div className={classes.expensesDiv}>
                    <span className={classes.expensesCurrency}>₦</span>
                    <span className={classes.expensesValue}>{` ${currentValue}`}</span>
                  </div>
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
                <BarChart statData={tally} period={weeklyData.period} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    })}
  </Grid>
);

OutletOperations.propTypes = {
  classes: PropTypes.instanceOf(Object),
};

OutletOperations.defaultProps = {
  classes: {},
};

export default OutletOperations;
