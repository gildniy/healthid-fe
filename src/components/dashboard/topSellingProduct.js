import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, Typography } from '@material-ui/core';
import image from './mocks/paracetamol.jpeg';

const TopSellingProduct = ({ classes }) => (
  <Paper square elevation={2} className={classes.topSellingPaper}>
    <Typography variant="subtitle1" className={classes.topSellingHeader}>
      Top-selling Product
    </Typography>
    <Grid container item style={{ height: '10rem' }}>
      <img src={image} className={classes.topSellingMedia} alt="media" />
    </Grid>
    <Typography variant="subtitle1" className={classes.topSellingProduct}>
      Panadol Tablet Sachets x12
    </Typography>
    <Grid container item className={classes.topSellingFooter}>
      <Typography variant="caption">
        450 Sold
      </Typography>
      <Paper elevation={0} className={classes.topSellingInStockPaper}>
        <Typography variant="caption" className={classes.topSellingInStock}>
          320 In Stock
        </Typography>
      </Paper>
    </Grid>
  </Paper>
);
TopSellingProduct.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string)
};

TopSellingProduct.defaultProps = {
  classes: {}
};

export default TopSellingProduct;
