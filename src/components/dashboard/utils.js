import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

export const SalesPerformanceLoader = ({ classes }) => (
  <Grid container className={classes.containerGrid}>
    <Grid item container className={classes.paperGrid1}>
      <Paper square elevation={2} className={classes.topSellingPaper}>
        <ContentLoader
          speed={1}
          width={400}
          height={115}
          viewBox="0 0 400 115"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="2" rx="2" ry="2" width="136" height="10" />
          <rect x="1" y="37" rx="2" ry="2" width="72" height="10" />
          <rect x="86" y="20" rx="2" ry="2" width="310" height="96" />
          <rect x="1" y="51" rx="2" ry="2" width="72" height="10" />
          <rect x="248" y="2" rx="2" ry="2" width="22" height="11" />
          <rect x="317" y="3" rx="2" ry="2" width="78" height="11" />
          <rect x="1" y="65" rx="2" ry="2" width="20" height="9" />
          <rect x="202" y="2" rx="2" ry="2" width="22" height="11" />
          <rect x="225" y="2" rx="2" ry="2" width="22" height="11" />
        </ContentLoader>
      </Paper>
    </Grid>
    <Grid item container className={classes.paperGrid2}>
      <Paper square elevation={2} className={classes.topSellingPaper}>
        <ContentLoader
          speed={1}
          width={420}
          height={475}
          viewBox="0 0 350 475"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="430" rx="2" ry="2" width="72" height="18" />
          <rect x="29" y="80" rx="2" ry="2" width="197" height="235" />
          <rect x="280" y="430" rx="2" ry="2" width="72" height="18" />
          <rect x="1" y="14" rx="2" ry="2" width="280" height="29" />
          <rect x="0" y="365" rx="2" ry="2" width="310" height="23" />
        </ContentLoader>
      </Paper>
    </Grid>
    <Grid container spacing={2} style={{ marginTop: '.8rem' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(value => (
        <Grid item container xs={3} key={value}>
          <Paper elevation={2} square className={classes.individualStat}>
            <ContentLoader
              speed={1}
              width={420}
              height={155}
              viewBox="0 0 400 155"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="98" rx="2" ry="2" width="40" height="25" />
              <rect x="273" y="102" rx="2" ry="2" width="6" height="55" />
              <rect x="0" y="139" rx="2" ry="2" width="56" height="17" />
              <rect x="0" y="4" rx="2" ry="2" width="251" height="25" />
              <rect x="293" y="87" rx="2" ry="2" width="6" height="70" />
              <rect x="313" y="64" rx="2" ry="2" width="6" height="90" />
              <rect x="333" y="62" rx="2" ry="2" width="6" height="94" />
              <rect x="353" y="80" rx="2" ry="2" width="6" height="76" />
              <rect x="373" y="96" rx="2" ry="2" width="6" height="60" />
              <rect x="393" y="109" rx="2" ry="2" width="6" height="47" />
              <rect x="233" y="119" rx="2" ry="2" width="6" height="39" />
              <rect x="213" y="126" rx="2" ry="2" width="6" height="31" />
              <rect x="253" y="109" rx="2" ry="2" width="6" height="47" />
            </ContentLoader>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Grid>
);

SalesPerformanceLoader.propTypes = {
  classes: PropTypes.instanceOf(Object),
};

SalesPerformanceLoader.defaultProps = {
  classes: {},
};

export default SalesPerformanceLoader;
