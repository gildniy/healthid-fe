import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, Typography
} from '@material-ui/core';
import { totalsCardStyles } from '../../../assets/styles/salesHistory/salesHistoryStyles';

export const TotalsCard = ({
  total: { title, value },
  classes
}) => (
  <Paper elevation={2} square className={classes.salesTotals}>
    <Typography variant="body1" className={classes.totalsHeading}>
      {title}
    </Typography>
    <Typography variant="h5" className={classes.totalsValue}>
      {value}
    </Typography>
  </Paper>
);

TotalsCard.propTypes = {
  classes: PropTypes.instanceOf(Object),
  total: PropTypes.instanceOf(Array)
};

TotalsCard.defaultProps = {
  classes: {},
  total: []
};

export default withStyles(totalsCardStyles)(TotalsCard);
