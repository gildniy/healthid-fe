import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid, Paper, IconButton, Tooltip, AppBar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import viewProductsStyles from '../../assets/css/viewProductsStyles';
import { HistoryIcon } from '../../assets/SvgIcons/sellScreenSvgs';
import SwitchComponentRendering from './switchComponentRendering';

const styles = viewProductsStyles;
export const ViewProducts = ({
  state,
  renderSearchBar,
  approvedProducts
}) => {
  const { searchValue } = state;
  return (
    <>
      <Grid container item xs={12} style={styles.historyIconWrap}>
        <Link to="/sell/history">
          <Tooltip title="Sales history">
            <IconButton>
              <HistoryIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Grid>
      <Grid container item>
        <Paper elevation={2} style={styles.paper}>
          <AppBar position="sticky" color="default" style={styles.search}>
            {renderSearchBar(searchValue)}
          </AppBar>
          <SwitchComponentRendering
            state={state}
            approvedProducts={approvedProducts}
          />
        </Paper>
      </Grid>
    </>
  );
};

ViewProducts.propTypes = {
  state: PropTypes.instanceOf(Object),
  renderSearchBar: PropTypes.func.isRequired,
  approvedProducts: PropTypes.instanceOf(Object),
};

ViewProducts.defaultProps = {
  state: {},
  approvedProducts: {}
};

export default withRouter(withStyles(styles)(ViewProducts));
