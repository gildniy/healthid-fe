import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, Grid, Divider
} from '@material-ui/core';
import {
  KeyboardArrowLeft, KeyboardArrowRight,
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import TotalsCard from './totalsCard';

import { useStateValue } from '../../../providers/stateProvider';

export const SaleHistoryTotals = ({
  classes
}) => {
  const [{
    saleHistory: { totals }
  }] = Object.values(useStateValue());

  const totalsContainer = useRef(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const element = totalsContainer.current;

  const scrollRight = () => {
    const containerWidth = 1570;
    const translateX = containerWidth - element.clientWidth;
    element.style.transform = `translateX(-${translateX}px)`;
    setDisabledButton(!disabledButton);
  };

  const scrollLeft = () => {
    element.style.transform = 'translateX(0px)';
    setDisabledButton(!disabledButton);
  };

  return (
    <Paper elevation={0} square className={classes.headerPaper}>
      <Grid item container xs={12} justify="center" className={classes.headerGrid}>
        <Typography variant="h5" className={classes.header}>
          Sales History
        </Typography>
      </Grid>
      <Divider light />
      <Grid item container xs={12} wrap="nowrap" alignItems="center" className={classes.cardsGrid}>

        <IconButton className={classes.rightArrowButton} disabled={!disabledButton} onClick={scrollLeft} color="black" component="span">
          <KeyboardArrowLeft className={classes.arrows} />
        </IconButton>
        <Grid item container xs={12} className={classes.cardContainer}>
          <Grid ref={totalsContainer} item container xs={12} className={classes.cardWrapper} wrap="nowrap" justify="space-between">
            {totals.map(total => (
              <TotalsCard
                key={total}
                total={total}
                className={classes.salesTotals}
              />
            ))}
          </Grid>
        </Grid>
        <IconButton className={classes.leftArrowButton} disabled={disabledButton} onClick={scrollRight} color="black" component="span">
          <KeyboardArrowRight className={classes.arrows} />
        </IconButton>

      </Grid>
    </Paper>
  );
};

SaleHistoryTotals.propTypes = {
  classes: PropTypes.instanceOf(Object),
};

SaleHistoryTotals.defaultProps = {
  classes: {},
};

export default SaleHistoryTotals;
